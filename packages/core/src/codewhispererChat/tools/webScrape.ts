/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { Writable } from 'stream'
import { InvokeOutput, OutputKind, CommandValidation, webScrapeToolResponseSize } from './toolShared'
import { chromium, Browser, Page } from 'playwright'
import { getLogger } from '../../shared/logger/logger'

export interface WebScrapeParams {
    url: string
    rawHTML?: boolean
    explanation?: string
}

/**
 * Tool for Scrapeing and extracting content from web pages
 */
export class WebScrape {
    private readonly url: string
    private readonly rawHTML: boolean
    private readonly logger = getLogger('webScrape')

    constructor(params: WebScrapeParams) {
        this.url = params.url
        this.rawHTML = params.rawHTML ?? false
    }

    /**
     * Validates the parameters for the web Scrape
     */
    async validate(): Promise<void> {
        if (!this.url) {
            throw new Error('url is required')
        }

        try {
            new URL(this.url)
        } catch (e) {
            throw new Error(`Invalid URL: ${this.url}`)
        }
    }

    /**
     * Determines if this command requires user acceptance
     */
    requiresAcceptance(): CommandValidation {
        return {
            requiresAcceptance: false,
        }
    }

    /**
     * Queues a description of the command to be executed
     */
    queueDescription(updates: Writable): void {
        updates.write(`Reading the web page: ${this.url}`)
    }

    /**
     * Executes the web search and returns the result
     */
    async invoke(updates?: Writable): Promise<InvokeOutput> {
        let browser: Browser | undefined = undefined

        try {
            // Launch a headless browser
            browser = await chromium.launch({
                headless: true,
            })

            // Create a new browser context
            const context = await browser.newContext({
                userAgent:
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                viewport: { width: 1280, height: 800 },
                timezoneId: 'America/New_York',
                locale: 'en-US',
            })

            // Create a new page
            const page = await context.newPage()

            // Set extra HTTP headers
            await page.setExtraHTTPHeaders({
                'Accept-Language': 'en-US,en;q=0.9',
                Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            })

            let content: string

            await page.goto(this.url, {
                waitUntil: 'networkidle',
                timeout: 10000,
            })

            // Wait for the content to be available
            await page.waitForLoadState('domcontentloaded')

            if (this.rawHTML) {
                content = await this.getRawDocument(page)
            } else {
                content = await this.extractMainContent(page)
            }

            if (content.length > webScrapeToolResponseSize) {
                this.logger.info(
                    `The body content is too large ${content.length}, truncating to the first ${webScrapeToolResponseSize} characters.`
                )
                content = content.substring(0, webScrapeToolResponseSize)
            }

            // Extract title and metadata
            const title = await page.title()
            const description = await this.getMetaDescription(page)

            const outputJson = {
                title,
                description,
                content,
            }

            return {
                output: {
                    kind: OutputKind.Json,
                    content: outputJson,
                },
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error)
            return {
                output: {
                    kind: OutputKind.Text,
                    content: `Error reading web page: ${errorMessage}`,
                    success: false,
                },
            }
        } finally {
            // Make sure to close the browser
            if (browser) {
                await browser.close()
            }
        }
    }

    /**
     * Extract meta description from the page
     */
    private async getMetaDescription(page: Page): Promise<string> {
        const description = await page.evaluate(() => {
            const metaDescription = document.querySelector('meta[name="description"]')
            const ogDescription = document.querySelector('meta[property="og:description"]')
            return (
                metaDescription?.getAttribute('content')?.trim() || ogDescription?.getAttribute('content')?.trim() || ''
            )
        })

        return description
    }

    /**
     * Extract the main content from the page
     */
    private async getRawDocument(page: Page): Promise<string> {
        return await page.evaluate(() => {
            return document.documentElement.outerHTML
        })
    }

    /**
     * Extract the main content from the page
     */
    private async extractMainContent(page: Page): Promise<string> {
        return await page.evaluate(() => {
            // Helper function to clean text
            const cleanText = (text: string): string => {
                return text.replace(/\s+/g, ' ').trim()
            }

            // Try to find main content container first using common selectors
            const mainContentSelectors = [
                'main',
                'article',
                'div[role="main"]',
                '.main-content',
                '#content',
                '.content',
                '.article',
                '#main',
                'section.content',
                'div[class*="content"]',
                'div[class*="article"]',
                'div[id*="content"]',
                'div[id*="article"]',
            ]

            // Try each selector to find a main content container
            for (const selector of mainContentSelectors) {
                try {
                    const mainElement = document.querySelector(selector)
                    if (mainElement && mainElement.textContent?.trim()) {
                        // Extract text from paragraphs and headers within the main content
                        const elements = mainElement.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, span, a')
                        if (elements.length > 0) {
                            const contentParts: string[] = []
                            for (const el of elements) {
                                // Create a clone to avoid modifying the original
                                const clone = el.cloneNode(true) as HTMLElement

                                // Remove script, style, and other non-content elements
                                for (const node of clone.querySelectorAll(
                                    'script, style, iframe, noscript, svg, canvas, img'
                                )) {
                                    node.remove()
                                }

                                const cleanedText = cleanText(clone.textContent || '')
                                if (cleanedText) {
                                    contentParts.push(cleanedText)
                                }
                            }

                            if (contentParts.length > 0) {
                                return contentParts.join('\n\n')
                            }
                        }

                        // If no paragraphs/headers found, use the main element's text
                        const clone = mainElement.cloneNode(true) as HTMLElement
                        for (const node of clone.querySelectorAll(
                            'script, style, iframe, noscript, svg, canvas, img'
                        )) {
                            node.remove()
                        }

                        const mainText = cleanText(clone.textContent || '')
                        if (mainText) {
                            return mainText
                        }
                    }
                } catch (e) {
                    // Continue to the next selector if there's an error
                    // eslint-disable-next-line aws-toolkits/no-console-log
                    console.error(`Error with selector ${selector}:`, e)
                }
            }

            // If no main content container found, try all paragraphs and headers
            const paragraphsAndHeaders = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, li, span')
            if (paragraphsAndHeaders.length > 0) {
                const contentParts: string[] = []
                for (const el of paragraphsAndHeaders) {
                    // Create a clone to avoid modifying the original
                    const clone = el.cloneNode(true) as HTMLElement

                    // Remove script, style, and other non-content elements
                    for (const node of clone.querySelectorAll('script, style, iframe, noscript, svg, canvas, img')) {
                        node.remove()
                    }

                    const cleanedText = cleanText(clone.textContent || '')
                    if (cleanedText) {
                        contentParts.push(cleanedText)
                    }
                }

                if (contentParts.length > 0) {
                    return contentParts.join('\n\n')
                }
            }

            // If still no content, look for divs with substantial text
            const divs = Array.from(document.querySelectorAll('div')).filter((div) => {
                const text = div.textContent?.trim() || ''
                // Only consider divs with substantial text and not likely navigation/footer
                const className = div.className.toLowerCase()
                return (
                    text.length > 100 &&
                    !className.includes('nav') &&
                    !className.includes('footer') &&
                    !className.includes('header') &&
                    !className.includes('sidebar') &&
                    !className.includes('menu') &&
                    !className.includes('comment')
                )
            })

            if (divs.length > 0) {
                const contentParts: string[] = []
                for (const div of divs) {
                    // Create a clone to avoid modifying the original
                    const clone = div.cloneNode(true) as HTMLElement

                    // Remove script, style, and other non-content elements
                    for (const node of clone.querySelectorAll('script, style, iframe, noscript, svg, canvas, img')) {
                        node.remove()
                    }

                    const cleanedText = cleanText(clone.textContent || '')
                    if (cleanedText) {
                        contentParts.push(cleanedText)
                    }
                }

                if (contentParts.length > 0) {
                    return contentParts.join('\n\n')
                }
            }

            // Last resort: get the body text, limited to a reasonable size
            const bodyText = document.body.textContent?.trim() || ''
            return bodyText
        })
    }
}
