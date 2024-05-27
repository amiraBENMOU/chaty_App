const mongoose=require("mongoose");
const user=new mongoose.Schema({
    username:String,
    Email:String,
    Password:String,
});
module.exports = mongoose.model("User", user)