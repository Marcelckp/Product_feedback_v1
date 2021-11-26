import axios from 'axios';
import connectToDb from '../../db';
import feedback from '../Models/feedback';

export default async (req, res, next) => {

    await connectToDb();

    if (req.method === 'POST') {

        // console.log(req.body)
        const newFeedback = new feedback(req.body);

        try {
            await newFeedback.save();
            res.status(201).json(newFeedback);
        } catch (err) {
            res.send(err)
        }

    } else if (req.method === 'PUT') {

        console.log(req.body);

        if (req.body.editPost) {

            console.log('edit post ready');

            try {

                const post = await feedback.findByIdAndUpdate(req.body.id, { title: req.body.title, feedback: req.body.feedback, status: req.body.status, tags: req.body.category }, { new: true });

                res.status(203).send(post);

            } catch (err) {
                console.log(err)
                res.send(err)
            }
        } else {
        
            try {
                
                const post = await feedback.findOne({'_id': { $eq: req.body.id }})

                const arr = Object.values(post.likes)

                let alreadyLiked;

                for (let i = 0; i < arr.length; i+=1) {
                    // console.log(arr[i].username, req.body.currentUser)
                    if ( arr[i].username === req.body.currentUser.username ) alreadyLiked = true
                }

                if (alreadyLiked) res.send('User already Liked this post')
                else {
                    const updatedFeedback = await feedback.findByIdAndUpdate( req.body.id, { likes: [...post.likes, req.body.currentUser] }, { new: true } )

                    // console.log(updatedFeedback); console.log(need I am found and set main and just router)

                    res.status(203).send(updatedFeedback);
                }

            } catch (err) {
                res.send(err)
            }
        }

    } else if (req.method === 'DELETE') {

        // console.log(req.query.id)

        await feedback.deleteOne({'_id':  req.query.id  } );
        res.status(200).json( { message: 'Successfully deleted feedback post' } );

    } else if (req.method === 'GET') {
        
        if ( req.query.username && !req.query.singlePost ) {

            // console.log(req.query.username, 'getting a users post');

            try {
                const posts = await feedback.find({ 'creator.username': { $eq: req.query.username }});
                res.status(200).json(posts);
            } catch (err) {
                res.send(err);
            }

        } else if (req.query.singlePost) {
            // console.log(req.query, 'req single post')

            try {

                const post = await feedback.findOne({'_id': { $eq: req.query.id}})
                res.status(200).json(post);

            } catch (err) {
                res.status(404).json('not found');
            }

        } else {

            const posts = await feedback.find();

            res.status(200).json(posts);

        }

    }
}