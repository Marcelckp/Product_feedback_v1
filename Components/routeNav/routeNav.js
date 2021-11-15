import { useRouter } from 'next/router';
import React from 'react'

//css module file
import style from './routeNav.module.css';

function routeNav(props) {
    const router = useRouter();
    return (
        <div className={style.NavMain}>
            <div className={style.NavC}>
                <div onClick={(e) => {
                    e.preventDefault();
                    router.back()
                }} className={`${style.goBack} ${!props.edit ? style.drop : ''}`}>
                    <svg width="5" height="10" viewBox="0 0 5 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 9L0 5L4 1" stroke="#4661E6" strokeWidth="2"/>
                    </svg>
                    <h1 className={style.title}>Go Back</h1>
                </div>

                { props.edit ? 
                <div onClick={(e) => {
                    e.preventDefault();
                    router.push(`/posts/${props.id}/edit`)
                }} className={style.edit}>
                    <p>Edit Feedback</p>
                </div>
                : 
                <div></div> }
            </div>
        </div>
    )
}

export default routeNav
