import React from 'react';

//css module file
import style from './Roadmap.module.css';

function Roadmap() {
    return (
        <div className={style.RoadMapContainer}>

            <div className={style.RoadMapHead}>
                <p className={style.RoadMapTitle}>Roadmap</p>
                <p className={style.RoadMapView}>View</p>
            </div>

            <div className={style.RoadMapBottom}>

                <div className={style.tagDiv}>

                    <div className={style.RoadMapTag}>

                        <svg className={style.dot} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <circle cx="4" cy="4" r="4" fill="#F49F85"/>
                        </svg>

                        <p className={style.tag}>Planned</p>

                    </div>
                    <p className={style.num}>2</p>

                </div>

                <div className={style.tagDiv}>
                
                    <div className={style.RoadMapTag}>

                        <svg className={style.dot} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <circle cx="4" cy="4" r="4" fill="#AD1FEA"/>
                        </svg>

                        <p className={style.tag}>In-Progress</p>

                    </div>

                    <p className={style.num}>3</p>

                </div>

                <div className={style.tagDiv}>

                    <div className={style.RoadMapTag}>

                    <svg className={style.dot} xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <circle cx="4" cy="4" r="4" fill="#62BCFA"/>
                    </svg>

                    <p className={style.tag}>Live</p>

                    </div>

                    <p className={style.num}>3</p>

                </div>

            </div>

        </div>
    )
}

export default Roadmap
