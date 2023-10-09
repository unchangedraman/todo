import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,

    },
    email: {
        type: String,
        unique: true,
        required: true,

    },
    password: {
        type: String,
        select : false,
        required: true,
    },
    createdAt: {
        type: Date,
        default : Date.now,
        required: true,
    },
});
export const User = mongoose.model('User', Schema);// jo User name hai vo collection ka hi name hai

