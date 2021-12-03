import { useRouter } from 'next/router';
import React, { useState } from 'react';
import style from './Roadmap.module.css';
import axios from 'axios';

function roadMap(props) {
    // console.log(props)

    const router = useRouter();

    const [planned, setPlanned] = useState(true);
    const [inprogress, setInprogress] = useState(false);
    const [live, setLive] = useState(false);

    return (
        <>  
            <div className={style.nav}>
                <div className={style.navContainer}>
                    <div className={style.col1}>
                        <div className={style.goBackDiv} onClick={() => router.back()}>
                            <svg width="5" height="10" viewBox="0 0 5 10" fill="" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 9L0 5L4 1" stroke="white" strokeWidth="2"/>
                            </svg>
                            <h1 className={style.title}>Go Back</h1>
                        </div>

                        <p className={style.roadmap}>Roadmap</p>
                    </div>
                    <div className={style.col2}>
                        <div onClick={() => {
                            router.push('/posts/create')
                        }} className={style.feedback}>
                                <p>+ Add Feedback</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.legend}>
                <p onClick={() => {
                    setLive(false);
                    setInprogress(false);
                    setPlanned(true)
                }} className={`${planned ? style.active : ''}`}>Planned ({props.planned.length})</p>

                <p onClick={() => {
                    setLive(false);
                    setPlanned(false);
                    setInprogress(true);
                }} className={`${inprogress ? style.active : ''}`}>In-Progress ({props.inprogress.length})</p>

                <p onClick={() => {
                    setLive(true);
                    setPlanned(false);
                    setInprogress(false);
                }} className={`${live ? style.active : ''}`}>Live ({props.live.length})</p>
            </div>

            <p className={style.bem}></p>

            <div className={style.container}>
                {planned ?
                    <>
                        <p className={style.containerTitle}>Planned ({props.planned.length})</p>
                        <p className={style.containerBlur}>Features that have been planned to be worked on</p>
                        
                        <div>
                            { props.planned.map((plan, index) => {

                                return (

                                    <div key={index}>
                                        <br />
                                        <br />
                                        <br />
                                        <h1>{plan.title}</h1>
                                        <br />
                                        <p>{plan.feedback}</p>
                                    </div>
                                )

                            })}
                        </div>
                    </>
                : 
                
                inprogress ? 
                    <>
                        <p className={style.containerTitle}>In-Progress ({props.inprogress.length})</p>
                        <p className={style.containerBlur}>Features currently being developed</p>
                    </>
                : 

                live ? 
                    <>
                        <p className={style.containerTitle}>Live ({props.live.length})</p>
                        <p className={style.containerBlur}>Features that are currently live</p>
                    </>
                : 
                ''}
            </div>
        </>
    )
}

export const getServerSideProps = async () => {
    const res = await axios.get('http://localhost:3000/api/feedback')
        .then(res => res.data);

        let planned = [];
        let live = [];
        let inprogress = [];

        res.forEach((post) => {
            if (post.status === 'Planned') {
                planned.push(post)
            } else if (post.status === 'In-progress') {
                inprogress.push(post)
            } else if (post.status === 'Live') {
                live.push(post)
            }
        })

    return {
        props: {
            planned, 
            live, 
            inprogress
        }
    }
}

export default roadMap
