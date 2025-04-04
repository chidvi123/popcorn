const mongoose = require("mongoose");

const ownerSchema=mongoose.Schema({
    fullname:{
        type: String,
        trim: true,
        minLength:3
    },
    email:String,
    password:String,
    prodcuts:{
       type:Array,
       default:[]
    },
    picture:String,
    gstin:String,
});

module.exports = mongoose.model("owner",ownerSchema);