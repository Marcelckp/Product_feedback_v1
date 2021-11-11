import React, { useEffect, useState } from 'react';
import axios from 'axios';

//next import 
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function Index(props) {

    console.log(props);

    const router = useRouter();

    const refreshData = async () => await router.reload(window.location.pathname);

    const user = useSelector(state => state.CurrentUser.value);
    console.log(user);
    const [feedBackPosts, setFeedBackPosts] = useState(props.posts);

    // useEffect(() => {

    //     let mounted = true;

    //     axios.get('/api/feedback')
    //         .then((res) => {
    //             console.log(res.data);
    //             if (mounted) setFeedBackPosts(res.data);
    //         }).catch((e) => {
    //             console.log(e)
    //         })

    //     return () => {
    //         mounted = false;
    //     }

    // },[])
    // console.log(router.replace)

    const likePost = async (id) => {
        await axios.put('/api/feedback', { id, currentUser: user })
            .then((res) => {
                console.log(res.data)
                refreshData();
            }).catch((e) => {
                console.log(e)
            })
            // return router.replace(router.asPath)
    }

    const deletePost = async (id) => {
        await axios.delete('/api/feedback', { 
            params: { id } })
            .then((res) => {
                refreshData()
            }).catch((e) => {
                console.log(e)
            })
    }

    return (
        <div>
            <h1>All FeedBack Posts</h1>
            <br /><br />
            
            <div>
                { feedBackPosts && feedBackPosts.map((post, i) => {
                    return (
                        <div key={i}>
                            <div>
                                <h1>{post.title}</h1>
                                <h2>{post.creator.name}</h2>
                                <h3>{post.creator.username}</h3>
                                <p>{post.feedback}</p>
                                <p>{post.tags}</p>
                                <p>Likes: {post.likes.length}</p>
                                <p>{post._id}</p>
                                <p>{post.createdAt}</p>

                                { user ?
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    likePost(post._id);
                                }}>Like button</button>

                                : null }

                                <div>
                                    <h1>comment on this post</h1>
                                    <button>Add A Comment</button>
                                </div>

                                {
                                    user && user.username === post.creator.username ?
                                    <div> 
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            deletePost(post._id)
                                        }}>Delete</button>
                                        <br />
                                        <button>Edit</button>
                                    </div>
                                    : null
                                }

                                <Link href={`posts/${post._id}/`} >View Post</Link>

                            </div>
                            <br />
                        </div>
                    )
                }) }
            </div>
            

            <ul>
                <li><Link href='/' >Return Home</Link></li>
                <li><Link href='/profilepage'>View Your Profile</Link></li>
            </ul>
            
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
