import React, { useState } from 'react';
import { useSelector } from 'react-redux';

//next imports
import Link from 'next/link';
import axios from 'axios';

function index() {

    const loggedIn = useSelector(state => state.CurrentUser.value);

    const [user, setUser] = useState(loggedIn);
    console.log(user);

    return (
        <div>
            <p>Home Page</p>
            {user ? <p>Welcome Sir/Madam {user.username}</p> : ''}
            <ul>
                {user ? <li><Link href='/profilepage'>View Your Profile</Link></li> : ''}
                <li><Link href='/signup'>Sign Up</Link></li>
                <li><Link href='/login'>Login</Link></li>
                <li>
                    <Link href='/posts'>View Posts</Link>
                </li>
            </ul>

            { user ?
                <div>
                    <h1>Now that you are logged in you have these permissions</h1>
                    <ul>
                        <li>
                            <Link href='/posts/create'>Create a Feedback Post</Link>
                        </li>
                    </ul>
                </div>
            :
            null}
        </div>
    )
}



export default index;
