import connectToDb from '../../db';
import accounts from '../Models/AccountUser';

export default async (req, res, next) => {

    await connectToDb();

    if (req.method === 'POST') {
        
        const newAccount =  new accounts(req.body);
        console.log(newAccount)

        try {
            await newAccount.save();
            res.status(201).json(newAccount);
        } catch (err) {
            res.send(err);
        }

    } else if (req.method === 'GET') {

        // console.log(req.query.email);

        try {

            const user = await accounts.findOne({'email': { $eq: req.query.email }})
            
            if (!user) {
                res.send('User Does not exist');
            } else res.status(200).json(user);
            
        } catch (err) {

            res.send(err.message);

        }

    } else if (req.method === 'PUT') {

        console.log(req.body, 'this is a put request');

        if (req.body.profilePicture) {

            try {
                const user = await accounts.findOne( { "username": { $eq: req.body.user.username} } )

                const updatedUser = await accounts.findByIdAndUpdate(user._id, {profilePhoto: req.body.image}, { new: true })

                res.status(201).json(updatedUser);

            } catch (err) {
                res.send(err);
            }
        }

    } else if (req.method === 'DELETE') {

        const user = await accounts.findOne( { "username": { $eq: req.body.username } } );

        user.deleteOne( { username: user.username})

    }
    
}