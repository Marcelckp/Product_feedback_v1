import mongoose from 'mongoose';
import { isEmail } from 'validator';
import defaultPfP from '../../image/default_pfp.png';

const AccountSchema = mongoose.Schema({
    profilePhoto: {
        type: String,
        default: defaultPfP.src
    },
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    surname: {
        type: String,
        required: 'Surname is required',
        trim: true
    },
    username: {
        type: String,
        unique: 'The Username you entered is taken.',
        required: 'Username is required.',
        trim: true
    },
    email: {
        type: String,
        validate: {
            validator: isEmail,
            message: 'The email you entered is invalid.',
            isAsync: false,
        },
        unique: true,
        required: 'Email is required.',
        trim: true
    },
    password: {
        type: String,
        validate: {
            validator: function (val) {
                return val.length > 5
            },
            message: 'The Password you entered is too short',
            isAsync: false,
        },
        required: 'Password is required.',
        trim: true
    }
})

const accounts = mongoose.models.accounts || mongoose.model('accounts', AccountSchema);
export default accounts;