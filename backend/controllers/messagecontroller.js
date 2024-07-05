const asynchandler = require('express-async-handler');
const Message = require('../models/message');
const User = require('../models/user');
const Chat = require('../models/chatmessage');
const sendmessage = asynchandler(async (req,res) =>{
    const {content,chatId} = req.body;
    if(!content || !chatId){
        console.log("invalid data pased into request");
        return res.status(400);
    }
    var newmessage = {
        sender: req.user._id,
        content : content,
        chat:chatId,
    }
    try{
        var message = await Message.create(newmessage);
        message = await message.populate('sender',"name pic");
        message = await message.populate("chat");
        message = await User.populate(message,{
            path: "chat.users",
            select: "name pic email",
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestmessage : message
        })
        res.json(message);

    }catch(err){
        throw new Error(err.message);
    }
});

const allmessages = asynchandler(async (req,res) =>{
    try{
        const messages = await Message.find({chat: req.params.chatId}).populate(
           "sender",
           "name pic email"
        ).populate("chat");
        res.json(messages);
    }catch(err){
        res.status(400);
        throw new Error(err.message);
    }
});

module.exports = { sendmessage, allmessages};