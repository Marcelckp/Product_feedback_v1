import React from 'react';
import Link from 'next/link';
function AlreadyLoggedIn() {
    return (
        <div>
            <p>You're already logged in.</p>
            <p>Click the links below to be taken where you want to go</p>
            <p>They will take good care of you</p>
            <ul>
                <li><Link href='/profilepage'>Profile</Link></li>
                <li><Link href='/'>Home</Link></li>
            </ul>
        </div>
    )
}

export default AlreadyLoggedIn
