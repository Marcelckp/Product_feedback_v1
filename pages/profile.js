import React, { useEffect, useRef, useState } from 'react';
// import { Redirect } from 'react-router';
import axios from 'axios';

//next imports
import { useRouter } from 'next/router';
import Link from 'next/link';

//redux imports
import { useSelector } from 'react-redux';
import store from '../redux/store';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/feature/userSlice';

//GREAT WORK keep up the hard work you got this focus up a bit more I know it can get tough but look at you you made it this far im proud of you

import FileBase from 'react-file-base64';

import defaultPfP from '../image/default_pfp.png';

//css module file
import style from '../styles/profilepage.module.css';

function profilePage() {

    const dispatch = useDispatch();
    const router = useRouter();
    
    const [ profilePicture, setProfilePicture ] = useState(null);

    const [CurrentUser, setCurrentUser] = useState(useSelector(state => state.CurrentUser.value));

    const [posts, setPosts] = useState(null);

    console.log(CurrentUser);

    useEffect(() => {
        let mounted = true;
        if (!CurrentUser) {
            router.push('/login');
        } else {

            axios.get('/api/feedback', { 
                params: {
                    username: CurrentUser.username,
                }
            })
                .then((res) => {
                    console.log(res.data);
                    if (mounted) setPosts(res.data);
                });

        }

        return () => {
            mounted = false;
        }
    },[])

    // console.log(store.getState().CurrentUser.value)
    
    return (
        <div className={style.container}>
            <div className={style.container_body}>
                <h1 className={style.title}>Hi there {CurrentUser ? CurrentUser.username : ''} Its good to see you!</h1>
                    <br />
                    <p><Link href='/'>Go Home</Link></p>
                    <br />
                    <p>
                        <Link href='/posts'>View Posts</Link>
                    </p>
                    <br />
                    <p>
                        <Link href='/posts/create'>Create a Post</Link>
                    </p>
                <br />
                <button className={style.logoutBtn} onClick={(e) => {
                    e.preventDefault();
                    dispatch(logout());
                    router.push('/');
                }}>Log Out</button>

                <br /><br />
                
                <div>
                    <p>Current Profile picture</p>
                    { CurrentUser && !CurrentUser.profilePhoto ? <img className={style.pfp} src={defaultPfP} alt='profile' /> : CurrentUser && CurrentUser.profilePhoto ? <img className={style.pfp} src={CurrentUser.profilePhoto} alt='profile'/> : ''}
                </div>

                <br />

                <h1 className={style.title2}>Add a profile Picture</h1>

                {/* <input onChange={() => console.log(profilePicture.current.value)} ref={profilePicture} type="file" placeholder='Click here to add your profile picture' /> */}

                <br />
                <div className={style.choose}>
                    <FileBase
                        type='file'
                        multiple={false}
                        onDone={({ base64 }) => {
                            console.log(base64)
                            setProfilePicture(base64)
                        }}
                    />
                </div>
                <br />
                <button className={style.setPfp} onClick={(e) => {
                    e.preventDefault()
                    axios.put('/api/accounts', {
                        profilePicture: true,
                        user: CurrentUser,
                        image: profilePicture
                    }).then(res => {
                        console.log(res.data)
                    })
                }}>Set Profile Picture</button>

                <br />
                <br />
                <button className={style.deleteBtn}>Delete Account</button>
                <br />
                <br />
                <div>
                    <h1 className={style.title2}>Your Feedback Posts</h1>
                    <br />
                    { posts && posts.map((post, i) => {
                        return (

                            <div key={i} className={`${style.FeedbackContainer} ${style.inprogress}`}>
                                <div className={style.containerTag}>
                                    <svg className={style.dot} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                        <circle cx="4" cy="4" r="4" fill={` ${post.status === 'Live' ? '#62BCFA': post.status === 'In-Progress' ? '#AD1FEA' : post.status === 'Planned' ? '#F49F85' : '' } `}></circle>
                                    </svg>
                                    <p>{post.status}</p>
                                </div>
                                <h1 className={style.feedbackTitle}>{post.title}</h1>
                                <p>{post.feedback}</p>
                                <div className={style.interactions}>
                                    <div className={style.classification}>
                                        <p>{post.tags}</p>
                                    </div>
                                    <div className={style.interactionsContainer}>
                                        <div className={style.likeContainer}>
                                            <svg class="postIndex_like_icon__1gl9i" width="9" fill="none" height="7" viewBox="0 0 9 7">
                                                <path id="Path 2" d="M0 6L4 2L8 6" stroke="#4661E6" stroke-width="2"></path>
                                            </svg>
                                            <p>{post.likes.length}</p>
                                        </div>
                                        <div className={style.commentContainer}>
                                            <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                                <path d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z" fill="#CDD2EE"></path>
                                            </svg>
                                            <p>{post.comments.length - 1}</p>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        )
                    }) }
                </div>
            </div>
        </div>
    )
}

// export async function getStaticProps() {
    
//     if (!store.getState().CurrentUser.value) { 
//      return await {
//         redirect: {
//             permanent: false,
//             destination: '/login',
//         }
//     }
//   }
// }

export default profilePage
