import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

//next imports
import Link from 'next/link';
import { useSelector } from 'react-redux';

function index(props) {

    // console.log(props.id);

    const user = useSelector(state => state.CurrentUser.value);

    const [commentsForPost, setCommentsForPost] = useState(null);

    const [openComment, setOpenComment] = useState(null);

    const comment = useRef(null);

    const sendComment = () => {
        axios.post('/api/comment', {
            post_id: props.id,
            comment: comment.current.value,
            user,
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        let mounted = true;
        axios.get('/api/comment', {
            params: {
                id: props.id
            }
        }).then((res) => {
            setCommentsForPost(res.data)
        })
    },[])

    // console.log(commentsForPost)

    return (
        <div>
            <h1>view single post</h1>
            <div>
                <p>{props.title}</p>
                <p>{props.post.feedback}</p>
                <p>{props.post.creator.name}</p>
                <p>{props.post.creator.username}</p>
            </div>
            <div>
                <h1>Comments</h1>
                { commentsForPost ?
                    commentsForPost.map(( val, i ) => {
                        return (
                            <div key={i}>
                                <p>{val.user.username}</p>
                                <p>{val.comment}</p>
                                <p>{val.createdAt}</p>
                            </div>
                        )
                    })
                : null}
            </div>
            <div>
                <button onClick={(e) => {
                    e.preventDefault();
                    openComment ? setOpenComment(false) : setOpenComment(true);
                }}>Comment on this post</button>
            </div>
            {openComment ? 
                    <div>
                        <textarea name="" id="" cols="30" rows="10" placeholder='add your comment message here' ref={comment} ></textarea>
                        <br />
                        <button onClick={(e) => {
                            e.preventDefault();
                            sendComment()
                        }}>Submit Comment</button>
                    </div>
            : null}
            <ul>
                <li>
                    <Link href='/'>Return Home</Link>
                </li>
                <li>
                    <Link href='/profilepage'>View Profile</Link>
                </li>
            </ul>
        </div>
    )
}

export const getServerSideProps = async (context) => {
    console.log(context.params.id)
    const post = await axios.get('http://localhost:3000/api/feedback', {
            params: {
                singlePost: true,
                id: context.params.id
            },
            
    }).then(res => res.data)
    console.log(post)
    return {
        props : {
            id: context.params.id,
            post
        }
    }

}

// export const getStaticPaths = async () => {
//     const allPosts = await fetch('http://localhost:3000/api/feedback')
//     const post = await allPosts.json();

//     const paths = post.map((post) => {
//         return { params: {id: post._id.toString()}}
//     })

//     return { paths, fallback: false}
// }

export default index
