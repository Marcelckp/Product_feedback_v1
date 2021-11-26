import React from 'react';

import style from './Tags.module.css'

function Tags() {
    return (
        <div className={style.tagsContainer}>
            <div className={style.tagDiv}>
                <p className={style.tag}>All</p>
            </div>

            <div className={`${style.tagDiv}`}>
                <p className={style.tag}>UI</p>
            </div>

            <div className={`${style.tagDiv}`}>
                <p className={style.tag}>UX</p>
            </div>

            <div className={`${style.tagDiv}`}>
                <p className={style.tag}>Enhancements</p>
            </div>

            <div className={`${style.tagDiv}`}>
                <p className={style.tag}>Bug</p>
            </div>

            <div className={`${style.tagDiv}`}>
                <p className={style.tag}>Feature</p>
            </div>
        </div>
    )
}

export default Tags
