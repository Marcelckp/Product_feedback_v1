import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';

//next imports
import Link from 'next/link';
import { useRouter } from 'next/router';

//redux imports
import { useSelector } from 'react-redux';

//css module file
import style from '../../../styles/singlePost.module.css';

//image import
import default_pfp from '../../../image/default_pfp.png'

//components
import RouteNav from '../../../Components/routeNav/routeNav';

function index(props) {

    console.log(props);

    const router = useRouter();

    const user = useSelector(state => state.CurrentUser.value);

    const [commentsForPost, setCommentsForPost] = useState([]);

    const [added, setAdded] = useState(0);

    //================================================================
    //delete post logic

    const deletePost = async () => {
        await axios.delete('/api/feedback', { 
            params: { id: props.id } })
            .then((res) => {
                router.push('/posts/')
                // refreshData();
            }).catch((e) => {
                console.log(e)
            })
    }

    // ===============================================================
    // like logic section 

    const [alreadyLiked, setAlreadyLiked] = useState(false);

    const refreshData = async () => await router.reload(window.location.pathname);

    const likePost = async () => {

        if (user && !alreadyLiked) {

            await axios.put('/api/feedback', { id: props.id, currentUser: user })
                .then((res) => {
                    console.log(res.data)
                    refreshData();
                }).catch((e) => {
                    console.log(e)
                })

        } else if (alreadyLiked) { 
            return alert('You have already liked this post');
        } else {
            return alert('You need to login before being able to like this post');
        }

    }

    const isLiked = () => {
        const arrObjValues = Object.values(props.post.likes);
        let usernameArr = [];

        for (let i in arrObjValues) {
            usernameArr.push(arrObjValues[i].username);
        }

        if (user && usernameArr.includes(user.username)) setAlreadyLiked(true);
    }

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
            setAdded(prev => prev + 1);
            // refreshData()
            // console.log(res)
        }).catch((err) => {
            // console.log(err)
        })
    }

    //===============================================================

    useEffect(() => {
        let mounted = true;

        isLiked();

        axios.get('/api/comment', {
            params: {
                id: props.id
            }
        }).then((res) => {
            setCommentsForPost(res.data)
        })

        return () => {
            mounted = false;
        }
    },[added])

console.log(user)

    return (
        <div className={style.container}>
            <RouteNav edit={true} id={props.id} />
            <div className={style.container_body}>

                <h1 className={style.feedbackTitle}>{props.post.title}</h1>

                <p>{props.post.feedback}</p>

                <div className={style.tagsDiv}>
                    <p className={style.tags}>{props.post.tags}</p>
                </div>

                <div className={style.feedback}>

                    <div onClick={() => {
                        likePost()
                    }} className={`${style.feedback_like} ${alreadyLiked ? style.likedFeedback : ''}`}>
                        <svg className={style.like_icon} width="9" fill='none' height="7" viewBox="0 0 9 7">
                            <path id="Path 2" d="M0 6L4 2L8 6" stroke={`${ alreadyLiked ? 'white' : '#4661E6' }`} strokeWidth="2"/>
                        </svg>

                        <p className={`${alreadyLiked ? style.alreadyLiked : ''}`}>{props.post.likes.length}</p>
                    </div>
                    
                    <div className={style.feedback_comment}>
                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                            <path d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z" fill="#CDD2EE"/>
                        </svg> 
                        <p className={style.commentLength}>{commentsForPost.length || 0}</p>
                    </div>
                    
                </div>

            </div>

            { commentsForPost.length > 0 ? 
                <div className={style.container_comments}>

                        <h1 className={style.allCommentsTitle}>{commentsForPost && commentsForPost.length === 1 ? `${commentsForPost.length} Comment` : commentsForPost && commentsForPost.length > 1 ? `${commentsForPost.length || 0} Comments` : ''}</h1>

                        <div className={style.allCommentsBody}>

                            { commentsForPost ?

                                commentsForPost.map(( val, i ) => {
                                    console.log(val)
                                    return (
                                        <div className={style.bodyCmt} key={i}>

                                            <div className={style.headSection}>
                                                { val.user.profilePhoto ? <img className={style.pfp} src={val.user.profilePhoto} alt="" /> : <img className={style.pfp} src={default_pfp.src} alt="profile" /> }
                                                <div className={style.user}>
                                                    <p className={style.name}>{val.user.name} {val.user.surname}</p>
                                                    <p className={style.at}>@{val.user.username}</p>
                                                </div>
                                                
                                            </div>

                                            <div className={style.contentSection}>
                                                <p style={{color: '#647196'}}>{val.comment}</p>
                                                <p>{val.createdAt}</p>
                                            </div>
                                            
                                            

                                        </div>
                                    )
                                })
                            : null}
                        </div>

                </div>
            : ''}

            <div className={style.commentSection}>
                
                    {user ?
                        <>

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

                        </>
                    
                    : 
                        <>
                            <h1 className={style.commentTitle}>You need to log in before you can comment on this post</h1>

                            <div className={style.buttonDiv}>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/login')
                                }} className={style.loginBtn}>Login</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    router.push('/signup')
                                }} className={style.signUpBtn}>Sign Up</button>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    deletePost();
                                }} className={style.homeBtn}>Home</button>
                            </div>
                            
                        </>
                    }

            </div>

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
