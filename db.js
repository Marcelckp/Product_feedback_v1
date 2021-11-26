import Cred from './cred';
import mongoose from "mongoose";

const CONNECTIONurl = `mongodb+srv://${Cred.username}:${Cred.password}@productfeedbackapp.jfbfc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

export default async () => {
    if (mongoose.connections[0].readyState) return console.log('already a connection');
    // Using new database connection
    await mongoose.connect(CONNECTIONurl, {
        useNewUrlParser: true,
    }).then(() => console.log('connected to atlas database'));
};
