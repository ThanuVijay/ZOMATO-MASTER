import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullname:{type: String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    address:[{detail:{type:String}, for:{type:String}}],
    phoneNumber:[{type:Number}],
})

export const UserModel = mongoose.modal("Users",UserSchema);