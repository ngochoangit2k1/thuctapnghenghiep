import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    userId: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    videoId: [{ type: mongoose.Types.ObjectId, ref: 'Video' },],
    desc: {
        type: String,
        required: true,
    },

}, { timestamps: true }
)

export default mongoose.model('Comment', CommentSchema);