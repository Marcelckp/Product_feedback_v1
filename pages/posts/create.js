import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

//components
import AlreadyLoggedIn from '../../Components/AlreadyLoggedIn/AlreadyLoggedIn';

//next imports 
import Link from 'next/link';
import { useRouter } from 'next/router';

function Create() {
    const router = useRouter()

    const feedback = useRef(null);
    const category = useRef(null);
    const title = useRef(null);

    const [user, setUser] = useState(useSelector(state => state.CurrentUser.value)); 

    console.log(user)

    const createPost = async () => {

        console.log(feedback.current.value);
        console.log(category.current.value);

        await axios.post('/api/feedback', {
            creator: user,
            title: title.current.value,
            feedback: feedback.current.value,
            tags: category.current.value,
            status: 'Planned' 
        }).then((res) => {
            console.log(res.data);
            router.push('/posts')
        })

    }

    return (
        <>
        { user ?
        <div>
            <h1>Create FeedBack Post</h1>
            <form>
                <label>Title</label>
                <br />
                <input placeholder='Post Title' ref={title} type="text" />
                <br />
                <label htmlFor="">FeedBack</label>
                <br />
                <textarea placeholder='Post Feedback Message' ref={feedback} name="" id="" cols="30" rows="10"></textarea>
                <br />
                <label htmlFor="">Status</label>
                <input type="text" value='Suggestion' disabled/>
                <br />
                <label htmlFor="">Category</label>
                <select ref={category} name="" id="">
                    <option value="UI">UI</option>
                    <option value="UX">UX</option>
                    <option value="Enhancements">Enhancements</option>
                    <option value='Bug'>Bug</option>
                    <option value="Feature">Feature</option>
                </select>
                <br />
                <br />
                <button onClick={(e) => {
                    e.preventDefault()
                    createPost()
                }}>Create Post</button>
            </form>
            <div>
                <ul>
                    <li>
                        <Link href='/'>Go back Home</Link>
                    </li>
                    <li>
                        <Link href='/profilepage'>View your Profile</Link>
                    </li>
                </ul>
            </div>
        </div>
        : 
            <div>
                <h1>You need to log in before you can create a new post</h1>
                <Link href='/login'>Log In To Your Account</Link>
            </div>
        }
        </>
    )
}

export default Create;