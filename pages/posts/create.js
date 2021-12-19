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
                    <svg className={style.svgIcon} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                        <circle cx="20" cy="20" r="20" fill="url(#paint0_radial_0:173)"/>
                        <path d="M21.6732 25.7142V21.5469H25.7353V18.474H21.6732V14.2856H18.3898V18.474H14.2856V21.5469H18.3898V25.7142H21.6732Z" fill="white"/>
                        <defs>
                            <radialGradient id="paint0_radial_0:173" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(41.56 -4.15462) rotate(129.411) scale(66.7263)">
                                <stop stopColor="#E84D70"/>
                                <stop offset="0.530886" stopColor="#A337F6"/>
                                <stop offset="1" stopColor="#28A7ED"/>
                            </radialGradient>
                        </defs>
                    </svg>
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