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
                }} className={`${style.plannedHov} ${planned ? style.activePlan : ''}`}>Planned ({props.planned.length})</p>

                <p onClick={() => {
                    setLive(false);
                    setPlanned(false);
                    setInprogress(true);
                }} className={`${style.inprogressHov} ${inprogress ? style.activeProg : ''}`}>In-Progress ({props.inprogress.length})</p>

                <p onClick={() => {
                    setLive(true);
                    setPlanned(false);
                    setInprogress(false);
                }} className={`${style.liveHov} ${live ? style.activeLive : ''}`}>Live ({props.live.length})</p>
            </div>

            <p className={style.bem}></p>

            <div className={style.container}>
                {planned ?
                    <>
                        <p className={style.containerTitle}>Planned ({props.planned.length})</p>
                        <p className={style.containerBlur}>Features that have been planned to be worked on</p>
                        
                        <div className={style.containerContent}>
                            { props.planned.map((plan, index) => {

                                return (

                                    <div key={index} className={`${style.FeedbackContainer} ${style.planned}`}>
                                        <div className={style.containerTag}>
                                            <svg className={style.dot} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <circle cx="4" cy="4" r="4" fill="#F49F85"></circle>
                                            </svg>
                                            <p>Planned</p>
                                        </div>
                                        <h1 className={style.feedbackTitle}>{plan.title}</h1>
                                        <p>{plan.feedback}</p>
                                        <div className={style.interactions}>
                                            {/* <div> */}
                                                <div className={style.classification}>
                                                    <p>{plan.tags}</p>
                                                </div>
                                            {/* </div> */}
                                            <div className={style.interactionsContainer}>
                                                <div className={style.likeContainer}>
                                                    <svg class="postIndex_like_icon__1gl9i" width="9" fill="none" height="7" viewBox="0 0 9 7">
                                                        <path id="Path 2" d="M0 6L4 2L8 6" stroke="#4661E6" strokeWidth="2"></path>
                                                    </svg>
                                                    <p>{plan.likes.length}</p>
                                                </div>
                                                <div className={style.commentContainer}>
                                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                                        <path d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z" fill="#CDD2EE"></path>
                                                    </svg>
                                                    <p>{plan.comments.length}</p>
                                                </div>
                                            </div>
                                        </div>
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

                        <div className={style.containerContent} >
                            { props.inprogress.map((plan, index) => {

                                return (

                                    <div key={index} className={`${style.FeedbackContainer} ${style.inprogress}`}>
                                        <div className={style.containerTag}>
                                            <svg className={style.dot} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <circle cx="4" cy="4" r="4" fill="#AD1FEA"></circle>
                                            </svg>
                                            <p>In Progress</p>
                                        </div>
                                        <h1 className={style.feedbackTitle}>{plan.title}</h1>
                                        <p>{plan.feedback}</p>
                                        <div className={style.interactions}>
                                            <div className={style.classification}>
                                                <p>{plan.tags}</p>
                                            </div>
                                            <div className={style.interactionsContainer}>
                                                <div className={style.likeContainer}>
                                                    <svg class="postIndex_like_icon__1gl9i" width="9" fill="none" height="7" viewBox="0 0 9 7">
                                                    <path id="Path 2" d="M0 6L4 2L8 6" stroke="#4661E6" stroke-width="2"></path>
                                                    </svg>
                                                    <p>{plan.likes.length}</p>
                                                </div>
                                                <div className={style.commentContainer}>
                                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                                        <path d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z" fill="#CDD2EE"></path>
                                                    </svg>
                                                    <p>{plan.comments.length}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            })}
                        </div>
                    </>
                : 

                live ? 
                    <>
                        <p className={style.containerTitle}>Live ({props.live.length})</p>
                        <p className={style.containerBlur}>Features that are currently live</p>

                        <div className={style.containerContent} >
                            { props.live.map((plan, index) => {

                                return (

                                    <div key={index} className={`${style.FeedbackContainer} ${style.inprogress}`}>
                                        <div className={style.containerTag}>
                                            <svg className={style.dot} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                                                <circle cx="4" cy="4" r="4" fill="#62BCFA"></circle>
                                            </svg>
                                            <p>Live</p>
                                        </div>
                                        <h1 className={style.feedbackTitle}>{plan.title}</h1>
                                        <p>{plan.feedback}</p>
                                        <div className={style.interactions}>
                                            <div className={style.classification}>
                                                <p>{plan.tags}</p>
                                            </div>
                                            <div className={style.interactionsContainer}>
                                                <div className={style.likeContainer}>
                                                    <svg class="postIndex_like_icon__1gl9i" width="9" fill="none" height="7" viewBox="0 0 9 7">
                                                        <path id="Path 2" d="M0 6L4 2L8 6" stroke="#4661E6" stroke-width="2"></path>
                                                    </svg>
                                                    <p>{plan.likes.length}</p>
                                                </div>
                                                <div className={style.commentContainer}>
                                                    <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                                                        <path d="M2.62074 16H1.34534L2.24718 15.0895C2.73344 14.5986 3.0371 13.9601 3.11873 13.2674C1.03637 11.8878 0 9.88917 0 7.79388C0 3.92832 3.51913 0 9.0305 0C14.8692 0 18 3.61479 18 7.45522C18 11.321 14.8361 14.9333 9.0305 14.9333C8.0135 14.9333 6.95226 14.7963 6.00478 14.5448C5.10787 15.4735 3.89262 16 2.62074 16Z" fill="#CDD2EE"></path>
                                                    </svg>
                                                    <p>{plan.comments.length}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }) }
                        </div>
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
            } else if (post.status === 'In-Progress') {
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
