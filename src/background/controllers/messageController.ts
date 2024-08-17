import { MessagesOneWay } from "app/utils/api/messages";

export class MessageChannels {
  static tabPayloadChannel = new MessagesOneWay<{
    tabId: number;
    url: string;
  }>("tab-payload");
}
