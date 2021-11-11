import connectToDb from '../../db';
import comments from '../Models/comments';

export default async (req, res, next) => {
    await connectToDb()

    if (req.method === 'POST') {

        // res.send(req.body)

        const newComment = new comments(req.body)
        
        try {
            await newComment.save();
            res.status(201).json(newComment);
        } catch (err) {
            res.status(301).json(err)
        }

        console.log('targeting post comments')

    } else if (req.method === 'GET') {
        console.log(req.query)
        const comEnt = await comments.find( { "post_id" : { $eq : req.query.id } } );

        res.status(200).json(comEnt)

    } else if (req.method === 'DELETE') {

    } else if (req.method === 'PUT') {

    }

}