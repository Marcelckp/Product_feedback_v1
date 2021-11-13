import axios from 'axios';
// import Head from 'next/head';
// import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

//redux actions 
import { login } from '../redux/feature/userSlice';

//next imports
import Link from 'next/link';
import Head from 'next/head';

//components 
import AlreadyLoggedIn from '../Components/AlreadyLoggedIn/AlreadyLoggedIn';

//module.css file
import style from '../styles/signup.module.css';

export default function Home() {

  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState(useSelector(state => state.CurrentUser.value));
  const [error, setError] = useState('');

  //============================================================================================
  //input ref section

  const Name = useRef(null);
  const Surname = useRef(null);
  const Username = useRef(null);
  const Email = useRef(null);
  const Password = useRef(null);

  //============================================================================================
  // error indicator section

  const [errorName, setErrorName] = useState(false);
  const [errorSurname, setErrorSurname] = useState(false);
  const [errorUsername, setErrorUsername] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);

  //============================================================================================

  const logn = async () => {
      await axios.post('/api/accounts', {
                name: Name.current.value,
                surname: Surname.current.value,
                username: Username.current.value,
                email: Email.current.value,
                password: Password.current.value

      }).then(response => {

        // console.log(response)

        if (response.data.errors) {

          setUser(null);
          let errRes = Object.keys(response.data.errors).map(key => [response.data.errors[key].message]);
          
          errRes.forEach(err => {
            const errV = err.join('');

            if (errV === 'Password is required') setErrorPassword(true)
            else if (errV === 'Name is required') setErrorName(true)
            else if (errV === 'Surname is required') setErrorSurname(true)
            else if (errV === 'Username is required') setErrorUsername(true)
            else if (errV === 'Email is required') setErrorEmail(true)

          })

          setError(errRes)
          
        } else if (response.data.index === 0) {

          if (response.data.keyValue.email && response.data.keyValue.username) {

            setError(null)
            setError(prev => ['The username already exists', 'The email already exists']);
            setErrorEmail(true);
            setErrorUsername(true);

          } else if (response.data.keyValue.email && !response.data.keyValue.username) {

            setError(['The email already exists']);
            setErrorEmail(true);

          } else if (response.data.keyValue.username && !response.data.keyValue.email) {

            setError(['The username already exists']);
            setErrorUsername(true);

          }

          setUser(null)

        } else if ( response.data.email ) {

          console.log(response.data);
          setUser(response.data);
          setError(null);
          dispatch(login(response.data));
          router.push('/profilepage');

        }

      });

  }

  return (
    <div className={style.container}>
      <Head>
        <title>Sign Up</title>
      </Head>
      { !user ? 
      <>
        <div className={style.container_body}>

            <div className={style.container_section}>
              <div>
                <h1 className={style.title}>Sign Up</h1>
                {error ? 
                  <div className={style.error}>
                      <ul>
                        { error.map((value, index) => {
                          return <li className={style.list} key={index}> {value}</li>
                        }) }
                      </ul>
                  </div> 
                : ''}
              </div>
              <div className={style.form_container}>
                <form>
                  <label className={style.label} htmlFor="">Name</label>
                  
                  <input placeholder='Enter your name...' onChange={() => setErrorName(false)} className={`${style.input} ${ errorName ? style.error_input : '' }`} type="text" ref={Name} />
                  
                  <label className={style.label} htmlFor="">Surname</label>
                  
                  <input placeholder='Enter your surname...' onChange={() => setErrorSurname(false)} className={`${style.input} ${ errorSurname ? style.error_input : '' }`} type="text" ref={Surname} />
                  
                  <label className={style.label} htmlFor="">Username</label>
                  
                  <input placeholder='Enter your username...' onChange={() => setErrorUsername(false)} className={`${style.input} ${ errorUsername ? style.error_input : '' }`} ref={Username} type="text"  />
                  
                  <label className={style.label} htmlFor="">Email Address</label>
                  
                  <input placeholder='Enter your email address...' onChange={() => setErrorEmail(false)} className={`${style.input} ${ errorEmail ? style.error_input : '' }`} ref={Email} type="text" />
                  
                  <label className={style.label} htmlFor="">Password</label>
                  
                  <input placeholder='Enter your password...' onChange={() => setErrorPassword(false)} className={`${style.input} ${ errorPassword ? style.error_input : '' }`} ref={Password} type="text" />
                  
                  <button className={style.button} onClick={(e) => {
                    e.preventDefault();
                    logn()
                  }}>Submit</button>

                  <button className={style.cancelBtn} onClick={(e) => {
                    e.preventDefault();
                    router.push('/');
                  }}>Cancel</button>
                  
                </form>
              </div>
            </div>

            <div className={style.links_container}>
              <div>
                <p>Already have an account?</p>
                <br />
                <Link className={style.redirect} href='/login'>Click here to login</Link>
              </div>
            </div>
            
        </div>
      </>
      : 
        <AlreadyLoggedIn />
      }
    </div>
  )
}
