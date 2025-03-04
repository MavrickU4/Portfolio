/*
File:
*/

import mongoose from "mongoose";
import passportLocalMongoose from 'passport-local-mongoose';
const { PassportLocalSchema } = mongoose;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    displayName: String,
    username: String,
    emailAddress: String,
    firstName: String,
    lastName: String,
    userType: String,
    admin: { type: Boolean, default: false }, 
},{
    timestamps:true,
    collection: 'users'
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model('User', UserSchema);
