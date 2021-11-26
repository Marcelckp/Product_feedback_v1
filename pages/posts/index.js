import React, { useEffect, useState } from 'react';
import axios from 'axios';

//next import 
import Link from 'next/link';
import { useRouter } from 'next/router';

//redux
import { useSelector } from 'react-redux';

//css module file
import style from '../../styles/postIndex.module.css';

//components
import Nav from '../../Components/Nav/Nav';

function Index(props) {

    console.log(props.posts);

    const router = useRouter();

    const refreshData = async () => await router.reload(window.location.pathname);

    const user = useSelector(state => state.CurrentUser.value);
    // console.log(user);

    const [feedBackPosts, setFeedBackPosts] = useState(props.posts);

    // const [Liked, setLiked] = useState(false);

    const likePost = async (id, L) => {
        if (L) return alert('You have already liked this post') 
        else if (user && !L) {
            await axios.put('/api/feedback', { id, currentUser: user })
                .then((res) => {
                    console.log(res.data, 'Liked')
                    refreshData();
                }).catch((e) => {
                    console.log(e)
                })
        }
    }

    return (
        <div className={style.container}>

        <Nav />
            
            <div className={style.container_container}>
                {user && feedBackPosts ? feedBackPosts.map( (post, i) => {

                    console.log(post);

                    const objLikeVal = Object.values(post.likes);

                    let isLiked = false;

                        objLikeVal.forEach(obj => {
                            if (obj.username === user.username) {
                                isLiked = true;
                            }
                        })

                    return (
                        <div onClick={(e) => {
                            e.preventDefault();
                            console.log(e.target.tagName);
                            if (e.target.tagName === 'DIV' || e.target.tagName === 'H1') router.push(`/posts/${post._id}`)
                        }} className={style.container_body} key={i}>
                            <div>
                                <h1 className={style.postTitle}>{post.title}</h1>

                                <br />

                                <p className={style.feedback}>{post.feedback}</p>

                                <br />

                                <div className={style.tagsDiv}>
                                    <p className={style.tag}>{post.tags}</p>
                                </div>

                                <br />

                                <div className={style.upVotes}>

                                    <div onClick={() => {
                                        likePost(post._id, isLiked)
                                    }} className={`${style.likeDiv} ${ isLiked ? style.liked : ''}`}>

                                        <svg className={style.like_icon} width="9" fill='none' height="7" viewBox="0 0 9 7">
                                            <path id="Path 2" d="M0 6L4 2L8 6" stroke={`${ isLiked ? 'white' : '#4661E6' }`} strokeWidth="2"/>
                                        </svg>

                                        <p className={style.likeCount}>{post.likes.length}</p>

                                    </div>

                                    <div className={style.commentDiv}>

                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z" fill="#CDD2EE"/>
                                        </svg> 

                                        <p className={style.commentCount}> { post.comments.length - 1 } </p>

                                    </div>

                                </div>

                            </div>

                        </div>
                    )
                }) : !user && feedBackPosts ? 

                    feedBackPosts.map( (post, i) => {

                    console.log(post);

                    return (
                        <div onClick={(e) => {
                            e.preventDefault();
                            console.log(e.target.tagName);
                            if (e.target.tagName === 'DIV' || e.target.tagName === 'H1') router.push(`/posts/${post._id}`)
                        }} className={style.container_body} key={i}>
                            <div>
                                <h1 className={style.postTitle}>{post.title}</h1>

                                <br />

                                <p className={style.feedback}>{post.feedback}</p>

                                <br />

                                <div className={style.tagsDiv}>
                                    <p className={style.tag}>{post.tags}</p>
                                </div>

                                <br />

                                <div className={style.upVotes}>

                                    <div onClick={() => {
                                        if (!user) alert("You need to be logged in before you can upVote feedback posts");
                                        else likePost(post._id)
                                    }} className={`${style.likeDiv}`}>

                                        <svg className={style.like_icon} width="9" fill='none' height="7" viewBox="0 0 9 7">
                                            <path id="Path 2" d="M0 6L4 2L8 6" stroke={`${ '#4661E6' }`} strokeWidth="2"/>
                                        </svg>

                                        <p className={style.likeCount}>{post.likes.length}</p>

                                    </div>

                                    <div className={style.commentDiv}>

                                        <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                            <path d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z" fill="#CDD2EE"/>
                                        </svg> 

                                        <p className={style.commentCount}> { post.comments.length - 1 } </p>

                                    </div>

                                </div>

                            </div>

                        </div>
                    )
                    })

                : ''}

            </div>
            
        </div>
    )
}


export const getServerSideProps = async () => {

    const res = await fetch('http://localhost:3000/api/feedback');

    const data = await res.json();
        
    return {
        props: {
            posts: data
        }
    }
}

export default Index
