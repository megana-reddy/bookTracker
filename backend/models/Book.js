import mongoose from "mongoose";
import { Schema, model } from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {type:String, required:true},
    author: {type: String, required:true},
    status: {
        type: String,
        enum: ["Reading", "Completed", "Want to Read"],
        default: "Want to Read"
    },
    createdAt: {type: Date, default: Date.now}
})


const Book = mongoose.model("Book", bookSchema);

export default Book;