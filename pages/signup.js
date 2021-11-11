import axios from 'axios';
import Head from 'next/head';
import Image from 'next/image';

import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/router';

//redux actions 
import { login } from '../redux/feature/userSlice';

//next imports
import Link from 'next/link';

//components 
import AlreadyLoggedIn from '../Components/AlreadyLoggedIn/AlreadyLoggedIn';

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
    <>
      { !user ? 
      <>
        <div>
        {user && !error ? <p> the user {user.username} has been created</p> : ''}
        {error ? <div>
          <h1>Error</h1>
            <ul>
              { error.map((value, index) => {
                console.log(value)
                return <li key={index}> {value}</li>
              }) }
            </ul>
        </div> : ''}
          <h1>The home page</h1>
            <form>
              <label htmlFor="">Name</label>
              <br />
              <input type="text" ref={Name} />
              <br />
              <label htmlFor="">Surname</label>
              <br />
              <input type="text" ref={Surname} />
              <br />
              <label htmlFor="">Username</label>
              <br />
              <input ref={Username} type="text"  />
              <br />
              <label htmlFor="">Email</label>
              <br />
              <input ref={Email} type="text" />
              <br />
              <label htmlFor="">Password</label>
              <br />
              <input ref={Password} type="text" />
              <br />
              <button onClick={(e) => {
                e.preventDefault();
                logn()
              }}>submit</button>
              <br />
            </form>
        </div>
        <div>
            <ul>
              <li><Link href='/'>Go Home</Link></li>
            </ul>
        </div>
        <div>
          <p>Already have an account?</p>
          <Link href='/login' >Click here to login</Link>
        </div>
      </>
      : 
        <AlreadyLoggedIn />
      }
    </>
  )
}
