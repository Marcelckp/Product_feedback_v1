import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

//next imports
import Link from 'next/link';
import { useSelector } from 'react-redux';

//css module file
import style from '../../../styles/singlePost.module.css';

function index(props) {

    console.log(props);

    const user = useSelector(state => state.CurrentUser.value);

    const [commentsForPost, setCommentsForPost] = useState(null);

    //================================================================
    // comment logic section
    const comment = useRef(null);

    const [commentChars, setCommentChars] = useState(250);

    const calChars = () => {
        let numbCharsCurrent = comment.current.value.length;
        console.log(numbCharsCurrent)

        setCommentChars(250 - numbCharsCurrent)
    }

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

    //===============================================================

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
        <div className={style.container}>

            <div className={style.container_body}>

                <h1 className={style.feedbackTitle}>{props.post.title}</h1>

                <div className={style.feedback}>
                    <p>{props.post.feedback}</p>
                    <p>{props.post.creator.name}</p>
                    <p>{props.post.creator.username}</p>
                </div>

            </div>

            { commentsForPost ? 
                <div className={style.container_comments}>

                    <div className={style.allComments}>
                        <h1 className={style.allCommentsTitle}>{commentsForPost && commentsForPost.length === 1 ? `${commentsForPost.length} Comment` : commentsForPost && commentsForPost.length > 1 ? `${commentsForPost.length} Comments` : ''}</h1>

                        <div className={style.allCommentsBody}>
                            { commentsForPost ?
                                commentsForPost.map(( val, i ) => {
                                    return (
                                        <div className={style.bodyCmt} key={i}>

                                            <div className={style.headSection}>
                                                <img src={val.user.image} alt="" />
                                                <div className={style.user}>
                                                    <p>{val.user.name} {val.user.surname}</p>
                                                    <p>{val.user.username}</p>
                                                </div>
                                                
                                            </div>

                                            <div className={style.contentSection}>
                                                <p>{val.comment}</p>

                                                <p>{val.createdAt}</p>
                                            </div>
                                            
                                            

                                        </div>
                                    )
                                })
                            : null}
                        </div>
                        

                    </div>

                </div>
            : ''}

            <div className={style.commentSection}>

                <h2 className={style.commentTitle}>Add A Comment</h2>

                <textarea onChange={() => calChars() } className={style.textarea} maxLength='250' placeholder='Add your comment message here...' ref={comment} ></textarea>

                <br />

                <div className={style.btnSection}>

                    <p className={style.characters}>{commentChars} Characters Left</p>

                    <button className={style.button} onClick={(e) => {
                        e.preventDefault();
                        sendComment()
                    }}>Post Comment</button>

                </div>

            </div>

                {/* <ul>
                    <li>
                        <Link href='/'>Return Home</Link>
                    </li>
                    <li>
                        <Link href='/profile'>View Profile</Link>
                    </li>
                </ul> */}

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
    // console.log(post);

    if (!post) {
        return {
            redirect: {
                permanent: false,
                destination: '/404'
            },
            props:{}
        }
        
    } else {
        return {
            props : {
                id: context.params.id,
                post
            }
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
