import React, { useState } from 'react';
import { useSelector } from 'react-redux';

//next imports
import Link from 'next/link';

//css module file
import style from '../styles/home.module.css';

function index() {

    const loggedIn = useSelector(state => state.CurrentUser.value);

    const [user, setUser] = useState(loggedIn);
    console.log(user);

    return (
        <div className={style.container}>
            <div className={style.container_body}>
                { user ? 
                    <h1 className={style.title}>Welcome {user.username}!</h1> 
                : 
                    <>
                        <h1 className={style.title}>Welcome To The Feedback App</h1>
                        <br />
                    </>
                }

                {user ? 
                    <>
                        <br />
                        <p><Link href='/profile'>View Your Profile</Link></p> 
                        <br />
                    </>
                : ''}

                

                {!user ? 
                    <>
                        <p><Link href='/signup'>Sign Up</Link></p>
                        <br />
                        <p><Link href='/login'>Login</Link></p>
                        <br />
                    </>
                : ''}
                
                <p>
                    <Link href='/posts'>View Posts</Link>
                </p>
                

                { user ?
                    <>
                        <br />
                        <p>
                            <Link href='/posts/create'>Create a Feedback Post</Link>
                        </p>
                    </>
                :
                null}

            </div>
        </div>
    )
}



export default index;
