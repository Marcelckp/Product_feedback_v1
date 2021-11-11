import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { login } from '../redux/feature/userSlice';

//components
import AlreadyLoggedIn from '../Components/AlreadyLoggedIn/AlreadyLoggedIn';

//next imports
import Link from 'next/link';

//tailwindcss
import 'tailwindcss/tailwind.css'

function LoginPage() {
    
    const dispatch = useDispatch();
    const router = useRouter();

    const loggedIn = useSelector(state => state.CurrentUser.value);

    const [user, setUser] = useState(loggedIn);
    const [error, setError] = useState('');

    const Email = useRef(null);
    const Password = useRef(null);

    const findUser = async () => {
        
        await axios.get('/api/accounts', {

            params: {
                email : Email.current.value
            }

        }).then(res => {

            // console.log(res)
            if (res.data === 'User Does not exist') setError([res.data]);

            else setUser(res.data);

            console.log(res.data.password === Password.current.value);

            if (res.data.password === Password.current.value) {
                dispatch(login(res.data))
                router.push('/profilepage');
            }
            else setError(prev => [ ...prev, 'Your Email or Password is incorrect.'])

        }).catch(error => {
            console.log(error);
            setError(error.message);
        })
    }

    // useEffect(() => {
    //     if (loggedIn) {
    //         router.push('/profilepage');
    //     }
    // })

    console.log(user)
    console.log(error)

    return (
        <>
            { !loggedIn ?
            <div>
                <form>
                    <label>Email</label>
                    <input type="text" ref={Email} />
                    <label htmlFor="">Password</label>
                    <input type="text" ref={Password} />
                    <button onClick={(e) => {
                        e.preventDefault();
                        findUser()
                    }} >Submit</button>
                </form>
                <div>

                </div>
                <ul>
                    { error ? 
                    <>
                        {error.map((e, i) =><li key={i}>{e}</li>)} 
                    </>  
                    : ''}
                </ul>
                <div>
                    <Link href='/'>Return Home</Link>
                </div>
                <div>
                    <p>Do not have an account click here to create a new account</p>
                    <Link href='/signup'>Create a new account</Link>
                </div>
            </div> 
            : 
                <AlreadyLoggedIn />
            }
        </>
    )
}

export default LoginPage
