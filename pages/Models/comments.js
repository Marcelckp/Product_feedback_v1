import mongoose  from "mongoose";

const commentSchema = mongoose.Schema({
    post_id: {
        type: String,
        trim: true,
    },
    comment: {
        type: String,
        required: 'Your comment message is required',
        trim: true
    },
    user: {
        type: {}
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const comment = mongoose.models.comment || mongoose.model('comment', commentSchema);

export default comment;