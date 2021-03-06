import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../redux/feature/userSlice';

//css module file
import style from '../styles/login.module.css';

//components
import AlreadyLoggedIn from '../Components/AlreadyLoggedIn/AlreadyLoggedIn';

//next imports
import Link from 'next/link';
import Head from 'next/head';

function LoginPage() {
    
    const dispatch = useDispatch();
    const router = useRouter();

    const loggedIn = useSelector(state => state.CurrentUser.value);

    const [user, setUser] = useState(loggedIn);
    const [error, setError] = useState('');

    const Email = useRef(null);
    const Password = useRef(null);

    //================================================================
    //error indicator section

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);

    //================================================================

    const findUser = async () => {
        
        await axios.get('/api/accounts', {

            params: {
                email : Email.current.value
            }

        }).then(res => {

            // console.log(res)
            if (res.data === 'User Does not exist') setError([res.data]);

            else setUser(res.data);

            // console.log(res.data.password === Password.current.value);

            if (res.data.password === Password.current.value) {
                dispatch(login(res.data))
                router.push('/profile');
            }
            else {
                setError(prev => [ ...prev, 'Your Email or Password is incorrect.'])
                setErrorEmail(true);
                setErrorPassword(true);
            }

        }).catch(error => {
            console.log(error);
            setError(error.message);
        })

    }

    // console.log(user)
    // console.log(error)

    return (
        <div className={style.container}>
            <Head>
                <title>Login</title>
            </Head>
            { !loggedIn ?
            <div className={style.container_body}>

                <h1 className={style.title}>Login</h1>

                <div className={style.error}>

                    <ul>
                        { error ? 
                        <>
                            {error.map((e, i) =><li className={style.list} key={i}>{e}</li>)} 
                        </>  
                        : ''}
                    </ul>

                </div>

                <form className={style.form}>
                
                    <label className={style.label}>Email</label>
                    
                    <input type="text" onChange={() => {
                        setErrorEmail(false)
                    }} placeholder='Enter your email address...' className={`${ style.input } ${ errorEmail ? style.error_input : '' } }`} ref={Email} />
                    
                    <label className={style.label} htmlFor="">Password</label>
                    
                    <input type="text" onChange={() => {
                        setErrorPassword(false);
                    }} placeholder='Enter your email password...' className={`${ style.input } ${ errorPassword ? style.error_input : '' }`} ref={Password} />
                    
                    <button className={style.button} onClick={(e) => {
                        e.preventDefault();
                        findUser()
                    }} >Submit</button>

                    <button className={style.cancelBtn} onClick={(e) => {
                        e.preventDefault();
                        router.push('/');
                    }}>Cancel</button>
                </form>

                <div className={style.links_container}>
                    <p>Don't have an account?</p>
                    <br />
                    <Link href='/signup'>Click here to create one</Link>
                </div>
            </div> 
            : 
                <AlreadyLoggedIn />
            }
        </div>
    )
}

export default LoginPage
