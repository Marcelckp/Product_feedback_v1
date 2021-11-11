import mongoose from 'mongoose';

const feedbackSchema = mongoose.Schema({
    creator: {
        type: {}
    },
    title: {
        type: String,
        required: 'You need to provide a title.',
        trim: true
    },
    feedback: {
        type: String,
        required: 'Your feedback message is required.',
        trim: true
    },
    status: {
        type: String,
        required: 'Your feedback status is required.',
        trim: true
    },
    tags: {
        type: String,
        required: 'You need to provide a tag for your feedback message.'
    },
    comments: {
        type: [{ String }],
        default: [{}],
    },
    likes: {
        type: [],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const feedbackPost = mongoose.models.feedbackPost || mongoose.model('feedbackPost', feedbackSchema);

export default feedbackPost;