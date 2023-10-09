import mongoose from "mongoose";
const Schema = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    iscompleted: {
        type: Boolean,
        default: false,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",// make sure ki ref hamesha collection ka hona chahiye
    },
    createdAt: {
        type: Date,
        default : Date.now,
        required: true,
    },
});
export const Task = mongoose.model('Task', Schema);

