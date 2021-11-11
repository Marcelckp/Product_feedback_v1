import mongoose from "mongoose";

const suggestionsSchema = mongoose.Schema({
    creator: {
        type: {}
    },
    title: {
        type: String,
        required: 'Your suggestion title is required',
        trim: true
    },
    suggestion: {
        type: String,
        required: 'Your suggestion message is required',
        trim: true
    },
    status: {
        type: String,
        default: 'suggestion'
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const suggestionPost = mongoose.models.suggestionPost || mongoose.model("suggestionPost", suggestionsSchema);

export default suggestionPost