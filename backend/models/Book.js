import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    genre: {
        type: String,
        required: true,
        trim: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["Available","Requested","Borrowed"],
        default: "Available"
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    borrowedUntil: {
        type: Date,
        default: null
    }
},
{
    timestamps: true
}
);

const Book = mongoose.model("Book",bookSchema);

export default Book ;