const mongoose = require("mongoose");
const config = require("config");
const dbgr = require("debug")("development:mongoose");

mongoose
    .connect(`${config.get("MONGODB_URI")}/popcorn`)
    .then(function()
    {
        dbgr("connected");
    })
   .catch(function (err)
  {
    dbgr(err);
  });

module.exports = mongoose.connection;


//console.log vadam annuko nee code vere user vadithey like client vadithey vadiki kuda console loo 
//print aithadi ala voddhu anukunte debugger vadali 