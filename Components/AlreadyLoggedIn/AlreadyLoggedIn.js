import React from 'react';

//next import 
import Link from 'next/link';

//css module file 
import style from './alreadyLoggedIn.module.css';

//redux 
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

function AlreadyLoggedIn() {

    console.log(style)

    const router = useRouter();

    const user = useSelector(state => state.CurrentUser.value);

    return (
        // <div className={style.container}>
            <div className={style.container_body}>
                <h2>Hi, { user.username } !</h2>
                <br />
                <p>You are already logged in so this page isn't necessary for you</p>
                <br />
                <p>Click the links below to be taken where you want to go</p>
                <p>They will take good care of you</p>
                <br />
                <button className={style.homeBtn} style={{width: '100%', border: 'none', padding: '10px', borderRadius: '10px', backgroundColor: '#AD1FEA', color: 'white'}} onClick={(e) => {
                    e.preventDefault();
                    router.push('/profile');
                }}>Profile</button>
                <br />
                <button className={style.profileBtn} style={{width:'100%', marginTop:'20px', border:'none', backgroundColor: '#3A4374', padding:'10px', borderRadius: '10px', color: 'white'}} onClick={(e) => {
                    e.preventDefault();
                    router.push('/');
                }}>Home</button>
            </div>
        // </div>
    )
}

export default AlreadyLoggedIn;
