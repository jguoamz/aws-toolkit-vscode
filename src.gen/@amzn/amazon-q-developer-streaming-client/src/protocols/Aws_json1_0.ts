// smithy-typescript generated code
import {
  GenerateCodeFromCommandsCommandInput,
  GenerateCodeFromCommandsCommandOutput,
} from "../commands/GenerateCodeFromCommandsCommand";
import {
  SendMessageCommandInput,
  SendMessageCommandOutput,
} from "../commands/SendMessageCommand";
import { QDeveloperStreamingServiceException as __BaseException } from "../models/QDeveloperStreamingServiceException";
import {
  AccessDeniedException,
  AdditionalContentEntry,
  AppStudioState,
  AssistantResponseEvent,
  AssistantResponseMessage,
  ChatMessage,
  ChatResponseStream,
  CitationEvent,
  CodeEvent,
  CodeReferenceEvent,
  CommandInput,
  ConflictException,
  ConsoleState,
  ConversationState,
  CursorState,
  Diagnostic,
  DocumentSymbol,
  DryRunOperationException,
  DryRunSucceedEvent,
  EditorState,
  EnvState,
  EnvironmentVariable,
  FollowupPrompt,
  FollowupPromptEvent,
  GenerateCodeFromCommandsRequest,
  GenerateCodeFromCommandsResponseStream,
  GitState,
  ImageBlock,
  ImageSource,
  IntentsEvent,
  InteractionComponent,
  InteractionComponentEntry,
  InteractionComponentsEvent,
  InternalServerException,
  InvalidStateEvent,
  MessageMetadataEvent,
  Position,
  ProgrammingLanguage,
  Range,
  Reference,
  RelevantTextDocument,
  ResourceNotFoundException,
  RuntimeDiagnostic,
  SendMessageRequest,
  ServiceQuotaExceededException,
  ShellHistoryEntry,
  ShellState,
  Span,
  SupplementaryWebLink,
  SupplementaryWebLinksEvent,
  TextDocument,
  TextDocumentDiagnostic,
  ThrottlingException,
  Tool,
  ToolInputSchema,
  ToolResult,
  ToolResultContentBlock,
  ToolSpecification,
  ToolUse,
  ToolUseEvent,
  UserInputMessage,
  UserInputMessageContext,
  UserSettings,
  ValidationException,
} from "../models/models_0";
import {
  loadRestJsonErrorCode,
  parseJsonBody as parseBody,
  parseJsonErrorBody as parseErrorBody,
} from "@aws-sdk/core";
import {
  HttpRequest as __HttpRequest,
  HttpResponse as __HttpResponse,
} from "@smithy/protocol-http";
import {
  decorateServiceException as __decorateServiceException,
  expectString as __expectString,
  _json,
  collectBody,
  take,
  withBaseException,
} from "@smithy/smithy-client";
import {
  DocumentType as __DocumentType,
  Endpoint as __Endpoint,
  EventStreamSerdeContext as __EventStreamSerdeContext,
  HeaderBag as __HeaderBag,
  ResponseMetadata as __ResponseMetadata,
  SerdeContext as __SerdeContext,
} from "@smithy/types";
import { v4 as generateIdempotencyToken } from "uuid";

/**
 * serializeAws_json1_0GenerateCodeFromCommandsCommand
 */
export const se_GenerateCodeFromCommandsCommand = async(
  input: GenerateCodeFromCommandsCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = sharedHeaders("GenerateCodeFromCommands")
  let body: any;
  body = JSON.stringify(_json(input));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
}

/**
 * serializeAws_json1_0SendMessageCommand
 */
export const se_SendMessageCommand = async(
  input: SendMessageCommandInput,
  context: __SerdeContext
): Promise<__HttpRequest> => {
  const headers: __HeaderBag = sharedHeaders("SendMessage")
  let body: any;
  body = JSON.stringify(se_SendMessageRequest(input, context));
  return buildHttpRpcRequest(context, headers, "/", undefined, body);
}

/**
 * deserializeAws_json1_0GenerateCodeFromCommandsCommand
 */
export const de_GenerateCodeFromCommandsCommand = async(
  output: __HttpResponse,
  context: __SerdeContext & __EventStreamSerdeContext
): Promise<GenerateCodeFromCommandsCommandOutput> => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = { generatedCodeFromCommandsResponse: de_GenerateCodeFromCommandsResponseStream(output.body, context) };
  const response: GenerateCodeFromCommandsCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return response;
}

/**
 * deserializeAws_json1_0SendMessageCommand
 */
export const de_SendMessageCommand = async(
  output: __HttpResponse,
  context: __SerdeContext & __EventStreamSerdeContext
): Promise<SendMessageCommandOutput> => {
  if (output.statusCode >= 300) {
    return de_CommandError(output, context);
  }
  const contents = { sendMessageResponse: de_ChatResponseStream(output.body, context) };
  const response: SendMessageCommandOutput = {
    $metadata: deserializeMetadata(output),
    ...contents,
  };
  return response;
}

/**
 * deserialize_Aws_json1_0CommandError
 */
const de_CommandError = async(
  output: __HttpResponse,
  context: __SerdeContext,
): Promise<never> => {
  const parsedOutput: any = {
    ...output,
    body: await parseErrorBody(output.body, context)
  };
  const errorCode = loadRestJsonErrorCode(output, parsedOutput.body);
  switch (errorCode) {
    case "AccessDeniedException":
    case "com.amazon.aws.codewhisperer#AccessDeniedException":
      throw await de_AccessDeniedExceptionRes(parsedOutput, context);
    case "InternalServerException":
    case "com.amazon.aws.codewhisperer#InternalServerException":
      throw await de_InternalServerExceptionRes(parsedOutput, context);
    case "ThrottlingException":
    case "com.amazon.aws.codewhisperer#ThrottlingException":
      throw await de_ThrottlingExceptionRes(parsedOutput, context);
    case "ValidationException":
    case "com.amazon.aws.codewhisperer#ValidationException":
      throw await de_ValidationExceptionRes(parsedOutput, context);
    case "ConflictException":
    case "com.amazon.aws.codewhisperer#ConflictException":
      throw await de_ConflictExceptionRes(parsedOutput, context);
    case "DryRunOperationException":
    case "com.amazon.aws.codewhisperer#DryRunOperationException":
      throw await de_DryRunOperationExceptionRes(parsedOutput, context);
    case "ResourceNotFoundException":
    case "com.amazon.aws.codewhisperer#ResourceNotFoundException":
      throw await de_ResourceNotFoundExceptionRes(parsedOutput, context);
    case "ServiceQuotaExceededException":
    case "com.amazon.aws.codewhisperer#ServiceQuotaExceededException":
      throw await de_ServiceQuotaExceededExceptionRes(parsedOutput, context);
    default:
      const parsedBody = parsedOutput.body;
      return throwDefaultError({
        output,
        parsedBody,
        errorCode
      }) as never
    }
  }

  /**
   * deserializeAws_json1_0AccessDeniedExceptionRes
   */
  const de_AccessDeniedExceptionRes = async (
    parsedOutput: any,
    context: __SerdeContext
  ): Promise<AccessDeniedException> => {
    const body = parsedOutput.body
    const deserialized: any = _json(body);
    const exception = new AccessDeniedException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return __decorateServiceException(exception, body);
  };

  /**
   * deserializeAws_json1_0ConflictExceptionRes
   */
  const de_ConflictExceptionRes = async (
    parsedOutput: any,
    context: __SerdeContext
  ): Promise<ConflictException> => {
    const body = parsedOutput.body
    const deserialized: any = _json(body);
    const exception = new ConflictException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return __decorateServiceException(exception, body);
  };

  /**
   * deserializeAws_json1_0DryRunOperationExceptionRes
   */
  const de_DryRunOperationExceptionRes = async (
    parsedOutput: any,
    context: __SerdeContext
  ): Promise<DryRunOperationException> => {
    const body = parsedOutput.body
    const deserialized: any = _json(body);
    const exception = new DryRunOperationException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return __decorateServiceException(exception, body);
  };

  /**
   * deserializeAws_json1_0InternalServerExceptionRes
   */
  const de_InternalServerExceptionRes = async (
    parsedOutput: any,
    context: __SerdeContext
  ): Promise<InternalServerException> => {
    const body = parsedOutput.body
    const deserialized: any = _json(body);
    const exception = new InternalServerException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return __decorateServiceException(exception, body);
  };

  /**
   * deserializeAws_json1_0ResourceNotFoundExceptionRes
   */
  const de_ResourceNotFoundExceptionRes = async (
    parsedOutput: any,
    context: __SerdeContext
  ): Promise<ResourceNotFoundException> => {
    const body = parsedOutput.body
    const deserialized: any = _json(body);
    const exception = new ResourceNotFoundException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return __decorateServiceException(exception, body);
  };

  /**
   * deserializeAws_json1_0ServiceQuotaExceededExceptionRes
   */
  const de_ServiceQuotaExceededExceptionRes = async (
    parsedOutput: any,
    context: __SerdeContext
  ): Promise<ServiceQuotaExceededException> => {
    const body = parsedOutput.body
    const deserialized: any = _json(body);
    const exception = new ServiceQuotaExceededException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return __decorateServiceException(exception, body);
  };

  /**
   * deserializeAws_json1_0ThrottlingExceptionRes
   */
  const de_ThrottlingExceptionRes = async (
    parsedOutput: any,
    context: __SerdeContext
  ): Promise<ThrottlingException> => {
    const body = parsedOutput.body
    const deserialized: any = _json(body);
    const exception = new ThrottlingException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return __decorateServiceException(exception, body);
  };

  /**
   * deserializeAws_json1_0ValidationExceptionRes
   */
  const de_ValidationExceptionRes = async (
    parsedOutput: any,
    context: __SerdeContext
  ): Promise<ValidationException> => {
    const body = parsedOutput.body
    const deserialized: any = _json(body);
    const exception = new ValidationException({
      $metadata: deserializeMetadata(parsedOutput),
      ...deserialized
    });
    return __decorateServiceException(exception, body);
  };

  /**
   * deserializeAws_json1_0ChatResponseStream
   */
  const de_ChatResponseStream = (
    output: any,
    context: __SerdeContext & __EventStreamSerdeContext
  ): AsyncIterable<ChatResponseStream> => {
    return context.eventStreamMarshaller.deserialize(
      output,
      async event => {
        if (event["messageMetadataEvent"] != null) {
          return {
            messageMetadataEvent: await de_MessageMetadataEvent_event(event["messageMetadataEvent"], context),
          };
        }
        if (event["assistantResponseEvent"] != null) {
          return {
            assistantResponseEvent: await de_AssistantResponseEvent_event(event["assistantResponseEvent"], context),
          };
        }
        if (event["dryRunSucceedEvent"] != null) {
          return {
            dryRunSucceedEvent: await de_DryRunSucceedEvent_event(event["dryRunSucceedEvent"], context),
          };
        }
        if (event["codeReferenceEvent"] != null) {
          return {
            codeReferenceEvent: await de_CodeReferenceEvent_event(event["codeReferenceEvent"], context),
          };
        }
        if (event["supplementaryWebLinksEvent"] != null) {
          return {
            supplementaryWebLinksEvent: await de_SupplementaryWebLinksEvent_event(event["supplementaryWebLinksEvent"], context),
          };
        }
        if (event["followupPromptEvent"] != null) {
          return {
            followupPromptEvent: await de_FollowupPromptEvent_event(event["followupPromptEvent"], context),
          };
        }
        if (event["codeEvent"] != null) {
          return {
            codeEvent: await de_CodeEvent_event(event["codeEvent"], context),
          };
        }
        if (event["intentsEvent"] != null) {
          return {
            intentsEvent: await de_IntentsEvent_event(event["intentsEvent"], context),
          };
        }
        if (event["interactionComponentsEvent"] != null) {
          return {
            interactionComponentsEvent: await de_InteractionComponentsEvent_event(event["interactionComponentsEvent"], context),
          };
        }
        if (event["toolUseEvent"] != null) {
          return {
            toolUseEvent: await de_ToolUseEvent_event(event["toolUseEvent"], context),
          };
        }
        if (event["citationEvent"] != null) {
          return {
            citationEvent: await de_CitationEvent_event(event["citationEvent"], context),
          };
        }
        if (event["invalidStateEvent"] != null) {
          return {
            invalidStateEvent: await de_InvalidStateEvent_event(event["invalidStateEvent"], context),
          };
        }
        if (event["error"] != null) {
          return {
            error: await de_InternalServerException_event(event["error"], context),
          };
        }
        return {$unknown: output};
      }
    );
  }
  /**
   * deserializeAws_json1_0GenerateCodeFromCommandsResponseStream
   */
  const de_GenerateCodeFromCommandsResponseStream = (
    output: any,
    context: __SerdeContext & __EventStreamSerdeContext
  ): AsyncIterable<GenerateCodeFromCommandsResponseStream> => {
    return context.eventStreamMarshaller.deserialize(
      output,
      async event => {
        if (event["codeEvent"] != null) {
          return {
            codeEvent: await de_CodeEvent_event(event["codeEvent"], context),
          };
        }
        if (event["Error"] != null) {
          return {
            Error: await de_InternalServerException_event(event["Error"], context),
          };
        }
        if (event["QuotaLevelExceededError"] != null) {
          return {
            QuotaLevelExceededError: await de_ServiceQuotaExceededException_event(event["QuotaLevelExceededError"], context),
          };
        }
        if (event["ValidationError"] != null) {
          return {
            ValidationError: await de_ValidationException_event(event["ValidationError"], context),
          };
        }
        return {$unknown: output};
      }
    );
  }
  const de_AssistantResponseEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<AssistantResponseEvent> => {
    const contents: AssistantResponseEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, _json(data));
    return contents;
  }
  const de_CitationEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<CitationEvent> => {
    const contents: CitationEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, _json(data));
    return contents;
  }
  const de_CodeEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<CodeEvent> => {
    const contents: CodeEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, _json(data));
    return contents;
  }
  const de_CodeReferenceEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<CodeReferenceEvent> => {
    const contents: CodeReferenceEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, _json(data));
    return contents;
  }
  const de_DryRunSucceedEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<DryRunSucceedEvent> => {
    const contents: DryRunSucceedEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, _json(data));
    return contents;
  }
  const de_FollowupPromptEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<FollowupPromptEvent> => {
    const contents: FollowupPromptEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, _json(data));
    return contents;
  }
  const de_IntentsEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<IntentsEvent> => {
    const contents: IntentsEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, _json(data));
    return contents;
  }
  const de_InternalServerException_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<InternalServerException> => {
    const parsedOutput: any = {
      ...output,
      body: await parseBody(output.body, context)
    };
    return de_InternalServerExceptionRes(parsedOutput, context);
  }
  const de_InvalidStateEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<InvalidStateEvent> => {
    const contents: InvalidStateEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, _json(data));
    return contents;
  }
  const de_MessageMetadataEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<MessageMetadataEvent> => {
    const contents: MessageMetadataEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, _json(data));
    return contents;
  }
  const de_ServiceQuotaExceededException_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<ServiceQuotaExceededException> => {
    const parsedOutput: any = {
      ...output,
      body: await parseBody(output.body, context)
    };
    return de_ServiceQuotaExceededExceptionRes(parsedOutput, context);
  }
  const de_SupplementaryWebLinksEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<SupplementaryWebLinksEvent> => {
    const contents: SupplementaryWebLinksEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, _json(data));
    return contents;
  }
  const de_ToolUseEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<ToolUseEvent> => {
    const contents: ToolUseEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, _json(data));
    return contents;
  }
  const de_ValidationException_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<ValidationException> => {
    const parsedOutput: any = {
      ...output,
      body: await parseBody(output.body, context)
    };
    return de_ValidationExceptionRes(parsedOutput, context);
  }
  const de_InteractionComponentsEvent_event = async (
    output: any,
    context: __SerdeContext
  ): Promise<InteractionComponentsEvent> => {
    const contents: InteractionComponentsEvent = {} as any;
    const data: any = await parseBody(output.body, context);
    Object.assign(contents, de_InteractionComponentsEvent(data, context));
    return contents;
  }
  // se_AdditionalContentEntry omitted.

  // se_AdditionalContentList omitted.

  // se_AppStudioState omitted.

  /**
   * serializeAws_json1_0AssistantResponseMessage
   */
  const se_AssistantResponseMessage = (
    input: AssistantResponseMessage,
    context: __SerdeContext
  ): any => {
    return take(input, {
      'content': [],
      'followupPrompt': _json,
      'messageId': [],
      'references': _json,
      'supplementaryWebLinks': _json,
      'toolUses': _ => se_ToolUses(_, context),
    });
  }

  /**
   * serializeAws_json1_0ChatHistory
   */
  const se_ChatHistory = (
    input: (ChatMessage)[],
    context: __SerdeContext
  ): any => {
    return input.filter((e: any) => e != null).map(entry => {
      return se_ChatMessage(entry, context);
    });
  }

  /**
   * serializeAws_json1_0ChatMessage
   */
  const se_ChatMessage = (
    input: ChatMessage,
    context: __SerdeContext
  ): any => {
    return ChatMessage.visit(input, {
      assistantResponseMessage: value => ({ "assistantResponseMessage": se_AssistantResponseMessage(value, context) }),
      userInputMessage: value => ({ "userInputMessage": se_UserInputMessage(value, context) }),
      _: (name, value) => ({ name: value } as any)
    });
  }

  // se_CliCommandsList omitted.

  // se_CommandInput omitted.

  // se_ConsoleState omitted.

  /**
   * serializeAws_json1_0ConversationState
   */
  const se_ConversationState = (
    input: ConversationState,
    context: __SerdeContext
  ): any => {
    return take(input, {
      'chatTriggerType': [],
      'conversationId': [],
      'currentMessage': _ => se_ChatMessage(_, context),
      'customizationArn': [],
      'history': _ => se_ChatHistory(_, context),
    });
  }

  // se_CursorState omitted.

  // se_Diagnostic omitted.

  // se_DocumentSymbol omitted.

  // se_DocumentSymbols omitted.

  // se_EditorState omitted.

  // se_EnvironmentVariable omitted.

  // se_EnvironmentVariables omitted.

  // se_EnvState omitted.

  // se_FollowupPrompt omitted.

  // se_GitState omitted.

  /**
   * serializeAws_json1_0ImageBlock
   */
  const se_ImageBlock = (
    input: ImageBlock,
    context: __SerdeContext
  ): any => {
    return take(input, {
      'format': [],
      'source': _ => se_ImageSource(_, context),
    });
  }

  /**
   * serializeAws_json1_0ImageBlocks
   */
  const se_ImageBlocks = (
    input: (ImageBlock)[],
    context: __SerdeContext
  ): any => {
    return input.filter((e: any) => e != null).map(entry => {
      return se_ImageBlock(entry, context);
    });
  }

  /**
   * serializeAws_json1_0ImageSource
   */
  const se_ImageSource = (
    input: ImageSource,
    context: __SerdeContext
  ): any => {
    return ImageSource.visit(input, {
      bytes: value => ({ "bytes": context.base64Encoder(value) }),
      _: (name, value) => ({ name: value } as any)
    });
  }

  // se_Position omitted.

  // se_ProgrammingLanguage omitted.

  // se_Range omitted.

  // se_Reference omitted.

  // se_References omitted.

  // se_RelevantDocumentList omitted.

  // se_RelevantTextDocument omitted.

  // se_RuntimeDiagnostic omitted.

  /**
   * serializeAws_json1_0SensitiveDocument
   */
  const se_SensitiveDocument = (
    input: __DocumentType,
    context: __SerdeContext
  ): any => {
    return input;
  }

  // se_ShellHistory omitted.

  // se_ShellHistoryEntry omitted.

  // se_ShellState omitted.

  // se_Span omitted.

  // se_SupplementaryWebLink omitted.

  // se_SupplementaryWebLinks omitted.

  // se_TextDocument omitted.

  // se_TextDocumentDiagnostic omitted.

  /**
   * serializeAws_json1_0Tool
   */
  const se_Tool = (
    input: Tool,
    context: __SerdeContext
  ): any => {
    return Tool.visit(input, {
      toolSpecification: value => ({ "toolSpecification": se_ToolSpecification(value, context) }),
      _: (name, value) => ({ name: value } as any)
    });
  }

  /**
   * serializeAws_json1_0ToolInputSchema
   */
  const se_ToolInputSchema = (
    input: ToolInputSchema,
    context: __SerdeContext
  ): any => {
    return take(input, {
      'json': _ => se_SensitiveDocument(_, context),
    });
  }

  /**
   * serializeAws_json1_0ToolResult
   */
  const se_ToolResult = (
    input: ToolResult,
    context: __SerdeContext
  ): any => {
    return take(input, {
      'content': _ => se_ToolResultContent(_, context),
      'status': [],
      'toolUseId': [],
    });
  }

  /**
   * serializeAws_json1_0ToolResultContent
   */
  const se_ToolResultContent = (
    input: (ToolResultContentBlock)[],
    context: __SerdeContext
  ): any => {
    return input.filter((e: any) => e != null).map(entry => {
      return se_ToolResultContentBlock(entry, context);
    });
  }

  /**
   * serializeAws_json1_0ToolResultContentBlock
   */
  const se_ToolResultContentBlock = (
    input: ToolResultContentBlock,
    context: __SerdeContext
  ): any => {
    return ToolResultContentBlock.visit(input, {
      json: value => ({ "json": se_SensitiveDocument(value, context) }),
      text: value => ({ "text": value }),
      _: (name, value) => ({ name: value } as any)
    });
  }

  /**
   * serializeAws_json1_0ToolResults
   */
  const se_ToolResults = (
    input: (ToolResult)[],
    context: __SerdeContext
  ): any => {
    return input.filter((e: any) => e != null).map(entry => {
      return se_ToolResult(entry, context);
    });
  }

  /**
   * serializeAws_json1_0Tools
   */
  const se_Tools = (
    input: (Tool)[],
    context: __SerdeContext
  ): any => {
    return input.filter((e: any) => e != null).map(entry => {
      return se_Tool(entry, context);
    });
  }

  /**
   * serializeAws_json1_0ToolSpecification
   */
  const se_ToolSpecification = (
    input: ToolSpecification,
    context: __SerdeContext
  ): any => {
    return take(input, {
      'description': [],
      'inputSchema': _ => se_ToolInputSchema(_, context),
      'name': [],
    });
  }

  /**
   * serializeAws_json1_0ToolUse
   */
  const se_ToolUse = (
    input: ToolUse,
    context: __SerdeContext
  ): any => {
    return take(input, {
      'input': _ => se_SensitiveDocument(_, context),
      'name': [],
      'toolUseId': [],
    });
  }

  /**
   * serializeAws_json1_0ToolUses
   */
  const se_ToolUses = (
    input: (ToolUse)[],
    context: __SerdeContext
  ): any => {
    return input.filter((e: any) => e != null).map(entry => {
      return se_ToolUse(entry, context);
    });
  }

  /**
   * serializeAws_json1_0UserInputMessage
   */
  const se_UserInputMessage = (
    input: UserInputMessage,
    context: __SerdeContext
  ): any => {
    return take(input, {
      'content': [],
      'images': _ => se_ImageBlocks(_, context),
      'origin': [],
      'userInputMessageContext': _ => se_UserInputMessageContext(_, context),
      'userIntent': [],
    });
  }

  /**
   * serializeAws_json1_0UserInputMessageContext
   */
  const se_UserInputMessageContext = (
    input: UserInputMessageContext,
    context: __SerdeContext
  ): any => {
    return take(input, {
      'additionalContext': _json,
      'appStudioContext': _json,
      'consoleState': _json,
      'diagnostic': _json,
      'editorState': _json,
      'envState': _json,
      'gitState': _json,
      'shellState': _json,
      'toolResults': _ => se_ToolResults(_, context),
      'tools': _ => se_Tools(_, context),
      'userSettings': _json,
    });
  }

  // se_UserSettings omitted.

  // se_WorkspaceFolderList omitted.

  // se_GenerateCodeFromCommandsRequest omitted.

  /**
   * serializeAws_json1_0SendMessageRequest
   */
  const se_SendMessageRequest = (
    input: SendMessageRequest,
    context: __SerdeContext
  ): any => {
    return take(input, {
      'conversationState': _ => se_ConversationState(_, context),
      'dryRun': [],
      'profileArn': [],
      'source': [],
    });
  }

  // de_AccessDeniedException omitted.

  // de_AssistantResponseEvent omitted.

  // de_CitationEvent omitted.

  // de_CitationTarget omitted.

  // de_CodeEvent omitted.

  // de_CodeReferenceEvent omitted.

  // de_ConflictException omitted.

  // de_DryRunOperationException omitted.

  // de_DryRunSucceedEvent omitted.

  // de_FollowupPrompt omitted.

  // de_FollowupPromptEvent omitted.

  // de_IntentData omitted.

  // de_IntentDataType omitted.

  // de_IntentMap omitted.

  // de_IntentsEvent omitted.

  // de_InternalServerException omitted.

  // de_InvalidStateEvent omitted.

  // de_MessageMetadataEvent omitted.

  // de_Reference omitted.

  // de_References omitted.

  // de_ResourceNotFoundException omitted.

  // de_ServiceQuotaExceededException omitted.

  // de_Span omitted.

  // de_SupplementaryWebLink omitted.

  // de_SupplementaryWebLinks omitted.

  // de_SupplementaryWebLinksEvent omitted.

  // de_ThrottlingException omitted.

  // de_ToolUseEvent omitted.

  // de_ValidationException omitted.

  /**
   * deserializeAws_json1_0InteractionComponentsEvent
   */
  const de_InteractionComponentsEvent = (
    output: any,
    context: __SerdeContext
  ): InteractionComponentsEvent => {
    return take(output, {
      'interactionComponentEntries': (_: any) => de_InteractionComponentEntryList(_, context),
    }) as any;
  }

  // de_Action omitted.

  // de_Alert omitted.

  // de_AlertComponent omitted.

  // de_AlertComponentList omitted.

  // de_CloudWatchTroubleshootingLink omitted.

  // de_InfrastructureUpdate omitted.

  // de_InfrastructureUpdateTransition omitted.

  /**
   * deserializeAws_json1_0InteractionComponent
   */
  const de_InteractionComponent = (
    output: any,
    context: __SerdeContext
  ): InteractionComponent => {
    return take(output, {
      'action': _json,
      'alert': _json,
      'infrastructureUpdate': _json,
      'progress': _json,
      'resource': _json,
      'resourceList': _json,
      'section': _json,
      'step': _json,
      'suggestions': _json,
      'taskDetails': _json,
      'taskReference': _json,
      'text': _json,
    }) as any;
  }

  /**
   * deserializeAws_json1_0InteractionComponentEntry
   */
  const de_InteractionComponentEntry = (
    output: any,
    context: __SerdeContext
  ): InteractionComponentEntry => {
    return take(output, {
      'interactionComponent': (_: any) => de_InteractionComponent(_, context),
      'interactionComponentId': __expectString,
    }) as any;
  }

  /**
   * deserializeAws_json1_0InteractionComponentEntryList
   */
  const de_InteractionComponentEntryList = (
    output: any,
    context: __SerdeContext
  ): (InteractionComponentEntry)[] => {
    const retVal = (output || []).filter((e: any) => e != null).map((entry: any) => {
      return de_InteractionComponentEntry(entry, context);
    });
    return retVal;
  }

  // de_ModuleLink omitted.

  // de_Progress omitted.

  // de_ProgressComponent omitted.

  // de_ProgressComponentList omitted.

  // de_Resource omitted.

  // de_ResourceList omitted.

  // de_Resources omitted.

  // de_Section omitted.

  // de_SectionComponent omitted.

  // de_SectionComponentList omitted.

  // de_Step omitted.

  // de_StepComponent omitted.

  // de_StepComponentList omitted.

  // de_Suggestion omitted.

  // de_SuggestionList omitted.

  // de_Suggestions omitted.

  // de_TaskAction omitted.

  // de_TaskActionConfirmation omitted.

  // de_TaskActionList omitted.

  // de_TaskActionNote omitted.

  // de_TaskActionPayload omitted.

  // de_TaskComponent omitted.

  // de_TaskComponentList omitted.

  // de_TaskDetails omitted.

  // de_TaskOverview omitted.

  // de_TaskReference omitted.

  // de_Text omitted.

  // de_WebLink omitted.

  const deserializeMetadata = (output: __HttpResponse): __ResponseMetadata => ({
    httpStatusCode: output.statusCode,
    requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
    extendedRequestId: output.headers["x-amz-id-2"],
    cfId: output.headers["x-amz-cf-id"],
  });

  // Encode Uint8Array data into string with utf-8.
  const collectBodyString = (streamBody: any, context: __SerdeContext): Promise<string> => collectBody(streamBody, context).then(body => context.utf8Encoder(body))

  const throwDefaultError = withBaseException(__BaseException);
  const buildHttpRpcRequest = async (
    context: __SerdeContext,
    headers: __HeaderBag,
    path: string,
    resolvedHostname: string | undefined,
    body: any,
  ): Promise<__HttpRequest> => {
    const {hostname, protocol = "https", port, path: basePath} = await context.endpoint();
    const contents: any = {
      protocol,
      hostname,
      port,
      method: "POST",
      path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
      headers,
    };
    if (resolvedHostname !== undefined) {
      contents.hostname = resolvedHostname;
    }
    if (body !== undefined) {
      contents.body = body;
    }
    return new __HttpRequest(contents);
  };
  function sharedHeaders(operation: string): __HeaderBag { return {
    'content-type': "application/x-amz-json-1.0",
    'x-amz-target': `AmazonQDeveloperStreamingService.${operation}`,
  }};
