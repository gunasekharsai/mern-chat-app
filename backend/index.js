const express = require("express");
const chats = require('./dummy')
const dotenv = require("dotenv");
const cors = require('cors')
const app = express();
app.use(cors());
dotenv.config();

app.get('/',(req,res)=>{
    res.send("api i s running")
})
app.get('/api/chats',(req,res) =>{
    res.send({chats})
})
app.get('/api/chats/:id',(req,res)=>{
    //res.send(req.params.id);
    const singlechat = chats.find(c => c.id === req.params.id );
    res.send(singlechat);
})

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log("server started on port 5000"));
