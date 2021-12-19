import React, { useEffect, useRef } from 'react';
import axios from 'axios';

//redux
import { useSelector } from 'react-redux';

//next imports
import { useRouter } from 'next/router';

//css module file
import style from './editPost.module.css';

//components
import RouteNav from '../../../Components/routeNav/routeNav';

function edit(props) {

    console.log(props);

    const router = useRouter();

    const user = useSelector(state => state.CurrentUser.value);

    //===============================
    //refs 

    const category = useRef(props.post.tags);

    const feedback = useRef(props.post.feedback);

    const title = useRef(props.post.title);

    const status = useRef(props.post.status);

    //===============================
    // save functionality

    const saveChanges = async () => {
        await axios.put('/api/feedback', { 

            editPost: true,
            id: props.id, 
            title: title.current.value,
            feedback: feedback.current.value,
            status: status.current.value,
            category: category.current.value

        }).then(() => {
            router.push('/');
        }).catch(err => {
            console.log(err)
        })
    }

    //===============================
    // delete functionality

    const deletePost = async () => {
        await axios.delete('/api/feedback', { 
            params: { id: props.id } })
            .then(() => {
                router.push('/posts/')
                // refreshData();
            }).catch((e) => {
                console.log(e)
            })
    }

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

                <svg className={style.svgIcon} xmlns="http://www.w3.org/2000/svg" width="40" height="40">
                    <defs>
                        <radialGradient cx="103.9%" cy="-10.387%" fx="103.9%" fy="-10.387%" r="166.816%" id="a">
                            <stop stopColor="#E84D70" offset="0%"/>
                            <stop stopColor="#A337F6" offset="53.089%"/><stop stopColor="#28A7ED" offset="100%"/>
                        </radialGradient>
                    </defs>
                    <g fill="none" fillRule="evenodd">
                        <circle fill="url(#a)" cx="20" cy="20" r="20"/>
                        <path d="M19.512 15.367l4.975 4.53-3.8 5.54L11.226 29l4.485-4.1c.759.275 1.831.026 2.411-.594a1.958 1.958 0 00-.129-2.82c-.836-.745-2.199-.745-2.964.068-.57.607-.767 1.676-.44 2.381L11 28.713c.255-1.06.683-2.75 1.115-4.436l.137-.531c.658-2.563 1.287-4.964 1.287-4.964l5.973-3.415zM23.257 12L28 16.443l-2.584 2.606-4.89-4.583L23.257 12z" fill="#FFF" fill-rule="nonzero"/>
                    </g>
                </svg>

                <h1 className={style.title}>{`Editing '${props.post.title}'`}</h1>
                <br />
                <br />
                <label className={style.label} htmlFor="">Feedback Title</label>
                <br />
                <p className={style.description}>Add a short description headline</p>

                <input className={style.input} type="text" ref={title} defaultValue={props.post.title} />
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

                <select className={style.selectMenu} ref={status} name="" id="">
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
                        saveChanges();
                    }}>Save Changes</button>
                    <br />
                    <button className={style.homeBtn} onClick={(e) => {
                        e.preventDefault();
                        router.push('/')
                    }}>Home</button>
                    <br />
                    <button className={style.deleteBtn} onClick={(e) => {
                        e.preventDefault();
                        deletePost();
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
