import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

//css module file
import style from './Roadmap.module.css';

//axios
import axios from 'axios';

function RoadMap() {
    
    const router = useRouter();
    const [live, setLive] = useState(0);
    const [planned, setPlanned] = useState(0);
    const [progress, setProgress] = useState(0);


    //Find a better more efficient way of getting the amount of feedback entries per category !! BUT YOUR DOING AMAZING KEEP IT UP!!
    useEffect(() => {
        let live = 0;
        let planned = 0;
        let progress = 0;

        const res = axios.get('http://localhost:3000/api/feedback')
            .then(res => res.data)
            .then(res => {
                // console.log(res)
                res.forEach((resObj) => {
                    if (resObj.status === 'Planned') planned++;
                    if (resObj.status === 'Live') live++;
                    if (resObj.status === 'In-Progress') progress++;
                })

                setLive(live);
                setPlanned(planned);
                setProgress(progress)
            });

    },[])

    return (
        <div className={style.RoadMapContainer}>

            <div className={style.RoadMapHead}>
                <p className={style.RoadMapTitle}>Roadmap</p>
                <p className={style.RoadMapView} onClick={(e) => router.push('/roadMap')}>View</p>
            </div>

            <div className={style.RoadMapBottom}>

                <div className={style.tagDiv}>

                    <div className={style.RoadMapTag}>

                        <svg className={style.dot} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <circle cx="4" cy="4" r="4" fill="#F49F85"/>
                        </svg>

                        <p className={style.tag}>Planned</p>

                    </div>
                    <p className={style.num}>{planned}</p>

                </div>

                <div className={style.tagDiv}>
                
                    <div className={style.RoadMapTag}>

                        <svg className={style.dot} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <circle cx="4" cy="4" r="4" fill="#AD1FEA"/>
                        </svg>

                        <p className={style.tag}>In-Progress</p>

                    </div>

                    <p className={style.num}>{progress}</p>

                </div>

                <div className={style.tagDiv}>

                    <div className={style.RoadMapTag}>

                    <svg className={style.dot} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <circle cx="4" cy="4" r="4" fill="#62BCFA"/>
                    </svg>

                    <p className={style.tag}>Live</p>

                    </div>

                    <p className={style.num}>{live}</p>

                </div>

            </div>

        </div>
    )
}

// export const getServerSideProps = async () => {
//     const res = await axios.get('http://localhost:3000/api/feedback')
//         .then(res => res.data);
//     console.log(res)
//         let planned = [];
//         let live = [];
//         let inprogress = [];

//         res.forEach((post) => {
//             if (post.status === 'Planned') {
//                 planned.push(post)
//             } else if (post.status === 'In-Progress') {
//                 inprogress.push(post)
//             } else if (post.status === 'Live') {
//                 live.push(post)
//             }
//         })

//     return {
//         props: {
//             hi: 'hi',
//             res,
//             planned, 
//             live, 
//             inprogress
//         }
//     }
// }

export default RoadMap
