import connectToDb from '../../db';
import comments from '../Models/comments';

import feedback from '../Models/feedback';

export default async (req, res, next) => {
    await connectToDb()

    if (req.method === 'POST') {

        // res.send(req.body)

        const newComment = new comments(req.body)

        const post = await feedback.findOne( { '_id': { $eq: req.body.post_id } } );
        
        try {

            await newComment.save();

            const upDatePost = await feedback.findByIdAndUpdate( req.body.post_id, { comments: [...post.comments, newComment._id] }, { new: true })

            res.status(201).json(newComment, upDatePost);

        } catch (err) {
            res.status(301).json(err.message)
        }

    } else if (req.method === 'GET') {
        
        // console.log(req.query)
        
        try {
            const comEnt = await comments.find( { "post_id" : { $eq : req.query.id } } );

            res.status(200).json(comEnt);
        } catch (err) {
            res.status(404).json(err.message)
        }

    } else if (req.method === 'DELETE') {

    } else if (req.method === 'PUT') {

    }

}