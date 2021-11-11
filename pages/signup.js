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

//components 
import AlreadyLoggedIn from '../Components/AlreadyLoggedIn/AlreadyLoggedIn';

//module.css file
import style from '../styles/signup.module.css';

export default function Home() {

  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState(useSelector(state => state.CurrentUser.value));
  const [error, setError] = useState('');


  const Name = useRef(null);
  const Surname = useRef(null);
  const Username = useRef(null);
  const Email = useRef(null);
  const Password = useRef(null);

  const logn = async () => {
      await axios.post('/api/accounts', {
                name: Name.current.value,
                surname: Surname.current.value,
                username: Username.current.value,
                email: Email.current.value,
                password: Password.current.value

      }).then(response => {

        console.log(response)

        if (response.data.errors) {

          setUser(null);
          let errRes = Object.keys(response.data.errors).map(key => [response.data.errors[key].message]);
          console.log(errRes);
          setError(errRes)
          
        } else if (response.data.index === 0) {

          if (response.data.keyValue.username) setError('The username already exists');
          if (response.data.keyValue.email) setError('The email already exists');
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

  // useEffect(() => {
  //   if (loggedIn) {
  //     router.push('/profilepage')
  //   }
  // })

  return (
    <div className={style.container}>
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
                          console.log(value)
                          return <li className={style.list} key={index}> {value}</li>
                        }) }
                      </ul>
                  </div> 
                : ''}
              </div>
              <div className={style.form_container}>
                <form>
                  <label className={style.label} htmlFor="">Name</label>
                  
                  <input placeholder='Enter your name...' className={style.input} type="text" ref={Name} />
                  
                  <label className={style.label} htmlFor="">Surname</label>
                  
                  <input placeholder='Enter your surname...' className={style.input} type="text" ref={Surname} />
                  
                  <label className={style.label} htmlFor="">Username</label>
                  
                  <input placeholder='Enter your username...' className={style.input} ref={Username} type="text"  />
                  
                  <label className={style.label} htmlFor="">Email Address</label>
                  
                  <input placeholder='Enter your email address...' className={style.input} ref={Email} type="text" />
                  
                  <label className={style.label} htmlFor="">Password</label>
                  
                  <input placeholder='Enter your password...' className={style.input} ref={Password} type="text" />
                  
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
