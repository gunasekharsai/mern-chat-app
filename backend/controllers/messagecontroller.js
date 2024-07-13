const asynchandler = require("express-async-handler");
const Message = require("../models/message");
const User = require("../models/user");
const Chat = require("../models/chatmessage");
const sendmessage = asynchandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("invalid data pased into request");
    return res.status(400);
  }
  var newmessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };
  try {
    var message = await Message.create(newmessage);
    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, {
      latestmessage: message,
    });
    res.json(message);
  } catch (err) {
    throw new Error(err.message);
  }
});

const allmessages = asynchandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});
const deleteMessage = asynchandler(async (req, res) => {
  try {
    const message = await Message.findById(req.params.messageId);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    console.log("Message found:", message);
    console.log("Chat ID:", message.chat);

    await Message.deleteOne({ _id: req.params.messageId });

    // Emit a message deletion event to all clients in the chat room
    const io = req.app.get('io');
    if (io && message.chat) {
      io.to(message.chat.toString()).emit('message deleted', message._id);
    } else {
      console.error("Socket.io instance or chat ID is undefined");
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (err) {
    res.status(400);
    throw new Error(err.message);
  }
});

module.exports = { sendmessage, allmessages, deleteMessage };
