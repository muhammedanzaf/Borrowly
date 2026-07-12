import mongoose, { Schema } from "mongoose";

const BorrowRequestSchema = new mongoose.Schema({

    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Returned"],
        default: "Pending"
    }
},
{timestamps: true}
);

export default mongoose.model("BorrowRequest", BorrowRequestSchema);