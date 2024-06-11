const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name : {type :String , required : true},
    email : {type :String , required : true,unique: true},
    password : {type :String , required : true, minlength : 6},
    //role : 1-> Super admin , 2 -> normal admin, 3-> user
    role : {type :Number , default : 3}
},{timestamps:true})

const User = mongoose.Schema("User",userSchema)

module.exports = User;