import messagesModel from "../models/message.model.js";

export default class Message {
  constructor() {}

  createMessage = async function (message) {
    try {
      const createdMessage = await messagesModel.create(message);
      return createdMessage;
    } catch (error) {
      throw new Error(error);
    }
  };

  getMessages = async function () {
    try {
      const messages = await messagesModel.find();
      return messages;
    } catch (error) {
      throw new Error(error);
    }
  };
}
