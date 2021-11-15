import React, { useEffect, useRef } from 'react';
import axios from 'axios';

//redux
import { useSelector } from 'react-redux';

//next imports
import { useRouter } from 'next/router';

//css module file
import style from '../../../styles/editPost.module.css';

//components
import RouteNav from '../../../Components/routeNav/routeNav';

function edit(props) {

    console.log(props);

    const router = useRouter();

    const user = useSelector(state => state.CurrentUser.value);

    //===============================
    //refs 

    const category = useRef(props.post.tags)

    const feedback = useRef(props.post.feedback)

    //===============================

    useEffect(() => {
        if (!user || user.username !== props.post.creator.username) {
            router.push('/login');
        } 

    })

    console.log(user)

    return (
        <div className={style.container}>
            <RouteNav edit={false} />
            <div className={style.container_body}>
                <h1 className={style.title}>{`Editing '${props.post.title}'`}</h1>
                <br />
                <br />
                <label className={style.label} htmlFor="">Feedback Title</label>
                <br />
                <p className={style.description}>Add a short description headline</p>

                <input className={style.input} type="text" defaultValue={props.post.title} />
                <br />
                <br />
                <label className={style.label} htmlFor="">Category</label>
                <br />
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
                <label className={style.label} htmlFor="">Update Status</label>
                <br />
                <p className={style.description}>Change feedback status</p>

                <select className={style.selectMenu} ref={category} name="" id="">
                    <option value="Planned">Planned</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Live">Live</option>
                </select>
                <br />
                <br />
                <label className={style.label} htmlFor="">Feedback Detail</label>
                <br />
                <p className={style.description}>Include any specific comments on what should be improved, added, etc</p>

                <textarea className={`${style.input} ${style.textarea}`} name="" id="" cols="30" rows="10" ref={feedback} defaultValue={props.post.feedback}></textarea>
                <br />
                <br />

                <div className={style.buttonDiv}>
                    <button className={style.editBtn} onClick={(e) => {
                        e.preventDefault();
                    }}>Save Changes</button>
                    <br />
                    <button className={style.homeBtn} onClick={(e) => {
                        e.preventDefault();
                        router.push('/')
                    }}>Home</button>
                    <br />
                    <button className={style.deleteBtn} onClick={(e) => {
                        e.preventDefault();
                    }}>Delete</button>
                </div>
                
            </div>
        </div>
    )
}

export const getServerSideProps = async (context) => {

    console.log(context.params)

    const post = await axios.get('http://localhost:3000/api/feedback', {
            params: {
                singlePost: true,
                id: context.params.id
            },
            
    }).then(res => res.data)
    // console.log(post);

    if (!post) {
        return {
            redirect: {
                permanent: false,
                destination: '/404'
            },
            props:{}
        }
        
    } else {
        return {
            props : {
                id: context.params.id,
                post
            }
        }
    }
}

export default edit
