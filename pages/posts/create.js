import React, { useRef, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

//css module file
import style from '../../styles/postcreate.module.css';

//next imports 
import Link from 'next/link';
import { useRouter } from 'next/router';

//components
import RouteNav from '../../Components/routeNav/routeNav';

function Create() {
    const router = useRouter()

    const feedback = useRef(null);
    const category = useRef(null);
    const title = useRef(null);

    const [user, setUser] = useState(useSelector(state => state.CurrentUser.value)); 

    console.log(user);

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
        <div className={style.container}>
        { user ?
            <>
            <RouteNav edit={false} />
                <div className={style.container_body}>
                    <h1 className={style.title}>Create New FeedBack</h1>
                    <br />
                    <form>

                        <label className={style.label}>Feedback Title</label>

                        <p className={style.description}>Add a short, descriptive headline</p>
                        
                        <input placeholder='Enter a title...' className={style.titleInput} ref={title} type="text" />

                        <br />
                        <br />

                        <label className={style.label} htmlFor="">Category</label>

                        <p className={style.description}>Choose a category for your feedback</p>

                        <select className={style.selectMenu} ref={category} name="" id="">
                            <option value="UI">UI</option>
                            <option value="UX">UX</option>
                            <option value="Enhancements">Enhancements</option>
                            <option value='Bug'>Bug</option>
                            <option value="Feature">Feature</option>
                        </select>

                        <br />
                        <br />

                        <label className={style.label} htmlFor="">FeedBack Detail</label>

                        <p className={style.description}>Include any specific comments on what should be improved, added, etc.</p>
                        
                        <textarea className={`${style.textarea}`} placeholder='Enter a post feedback message...' ref={feedback} name="" id="" cols="30" rows="10"></textarea>

                        <div className={style.buttonDiv}>
                            <button className={style.submitBtn} onClick={(e) => {
                                e.preventDefault()
                                createPost()
                            }}>Create Feedback</button>
                            <br />
                            <button className={style.profileBtn} onClick={(e) => {
                                e.preventDefault();
                                router.push('/profile')
                            }}>Profile</button>
                            <br />
                            <button className={style.homeBtn} onClick={(e) => {
                                e.preventDefault();
                                router.push('/')
                            }}>Home</button>
                        </div>
                    </form>
                    
                </div>
            </>
        : 
            <div>
                <h1>You need to log in before you can create a new post</h1>
                <Link href='/login'>Log In To Your Account</Link>
            </div>
        }
        </div>
    )
}

export default Create;