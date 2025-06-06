/*!
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import { TreeItem, TreeItemCollapsibleState, commands } from 'vscode'

export abstract class AWSTreeNodeBase extends TreeItem {
    public readonly regionCode?: string
    /** Service id as defined in the service model. May be undefined for child nodes. */
    public serviceId: string | undefined

    public override toString(): string {
        return `TreeItem(serviceId=${this.serviceId}, label=${this.label})`
    }

    public constructor(label: string, collapsibleState?: TreeItemCollapsibleState) {
        super(label, collapsibleState)
    }

    public getChildren(): Thenable<AWSTreeNodeBase[]> {
        return Promise.resolve([])
    }

    public refresh(): void {
        void commands.executeCommand('aws.refreshAwsExplorerNode', this)
    }
}
