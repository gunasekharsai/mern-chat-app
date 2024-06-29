const asyncHandler = require("express-async-handler");
const Chat  = require('../models/chatmessage');
const User = require("../models/user");
const accessChat = asyncHandler(async (req,res)=>{
    const {userId} = req.body;
    if(!userId){
        console.log("UserId param not sent with request");
        return res.sendStatus(400);
    }
    var isChat = await Chat.find({
        isGroupchat:false,
        $and: [
            {users:{$elemMatch: { $eq: req.user._id}}},
            {users: {$elemMatch: { $eq: userId}}},
        ]

    }).populate("users", "-password")
       .populate("latestmessage");
       isChat = await User.populate(isChat,{
        path:"latestmessage.sender",
        select:"name pic email",
       });

      if(isChat.length > 0){
        res.send(isChat[0]);
      }else{
        var chatData ={
            chatName:"sender",
            isGroupchat: false,
            users: [req.user._id, userId],
        };
        try{
            const createdChat = await Chat.create(chatData)
            const FullChat = await Chat.findOne({ _id:createdChat._id}).populate(
                "users",
                "-password"
            );
            res.status(200).send(FullChat);
        }catch(err){
            res.status(400);
            throw new Error(err.message);
        }
      }
})

const fetchChats = asyncHandler( async(req,res)=>{
    try{
        Chat.find( { users: { $elemMatch: { $eq: req.user._id}}})
        .populate('users',-"password")
        .populate("latestmessage")
        .sort({updatedAt: -1})
        .then(async(results) => {
            results = await User.populate(results,{
                path: "latestmessage.sender",
                select: "name pic email",
            });
            res.status(200).send(results);
        })
    }catch(err){
      throw new Error(err.message);
    }
})

module.exports = {accessChat, fetchChats};