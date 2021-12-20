import React from 'react';

import style from './Tags.module.css';

// Recoil 
import { searchState } from '../../../atoms/searchAtom';
import { useRecoilState } from 'recoil';

function Tags() {

    const [filter, setFilter] = useRecoilState(searchState)
    const changeFilter = (val) => {
        setFilter(val);
    }

    return (
        <div className={style.tagsContainer}>
            <div onClick={() => changeFilter('all')} className={`${style.tagDiv} ${filter === 'all' ? style.active : ''}`}>
                <p className={style.tag}>All</p>
            </div>

            <div onClick={() => changeFilter('ui')} className={`${style.tagDiv} ${filter === 'ui' ? style.active : ''}`}>
                <p className={style.tag}>UI</p>
            </div>

            <div onClick={() => changeFilter('ux')} className={`${style.tagDiv} ${filter === 'ux' ? style.active : ''}`}>
                <p className={style.tag}>UX</p>
            </div>

            <div onClick={() => changeFilter('enhancements')} className={`${style.tagDiv} ${filter === 'enhancements' ? style.active : ''}`}>
                <p className={style.tag}>Enhancements</p>
            </div>

            <div onClick={() => changeFilter('bug')} className={`${style.tagDiv} ${filter === 'bug' ? style.active : ''}`}>
                <p className={style.tag}>Bug</p>
            </div>

            <div onClick={() => changeFilter('feature')} className={`${style.tagDiv} ${filter === 'feature' ? style.active : ''}`}>
                <p className={style.tag}>Feature</p>
            </div>
        </div>
    )
}

export default Tags
