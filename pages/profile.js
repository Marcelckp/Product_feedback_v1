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
                    console.log(res.data)
                    if (mounted) setPosts(res.data)
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
                    <p><Link href='/login'> Go to Login </Link></p>
                    <br />
                    <p><Link href='/signup'>Go to Sign Up</Link></p>
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
                            <div key={i}>
                                <div>
                                    <p>{post.feedback}</p>
                                    <p>{post.tags}</p>
                                    <p>Likes: {post.likes.length}</p>
                                    <p>{post._id}</p>
                                </div>
                                <br />
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
