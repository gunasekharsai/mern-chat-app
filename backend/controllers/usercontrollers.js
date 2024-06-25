const asynchandler = require('express-async-handler');
const User  = require('../models/user')
const Token = require('../config/token')
const registerUser = asynchandler(async(req, res) =>{
    const {name, email, password, pic} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("please enter all the fields");
    }
    const userExists = await User.findOne({ email });
    if(userExists){
        res.status(400);
        throw new Error("user already exists");
    }
    const user = await User.create({
        name,
        email,
        password,
        pic
    });
    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:Token(user._id),
        });
    }else{
        res.status(400);
        throw new Error("failed to create error");
    }
})

const authUser =  asynchandler(async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("invalid credentails");
    } 
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password)) ){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token: Token(user._id)
        })
    }else{
        res.status(400);
        throw new Error("user not exist");
    }
})

const  allUsers = asynchandler(async (req,res)=>{
    const keyword = req.query.search ? {
        $or:[
            { name: {$regex: req.query.search, $options: 'i' }},
            { email: { $regex: req.query.search, $options: 'i'}},
        ]
    }
    : { };
    const users = await User.find(keyword).find({_id:{$ne: req.user._id}});
    res.send(users);
})

module.exports =  {registerUser, authUser, allUsers };