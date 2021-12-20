import { useRouter } from 'next/router';

//next imports
import React, { useState } from 'react';

//css module file
import style from './Nav.module.css';

//component
import Tags from './Tags/Tags';
import Roadmap from './Roadmap/Roadmap';

// Recoil
import { useRecoilValue } from 'recoil';
import { searchState } from '../../atoms/searchAtom'

function Nav() {

    const router = useRouter()

    const [openMenu, setOpenMenu] = useState(false);

    const search = useRecoilValue(searchState);

    console.log(search);

    return (
        <>

            <div className={style.container}>
                <div onClick={() => router.push('/')} className={style.titleSection}>
                    <p>Feedback Board</p>
                </div>
                <div className={style.burger} onClick={() => {
                    openMenu ? setOpenMenu(false) : setOpenMenu(true)
                }}>
                    <div className={`${style.Burger} ${openMenu ? style.open: ''}`}>
                        <span className={style.span}></span>
                        <span className={style.span}></span>
                        <span className={style.span}></span>
                        <span className={style.span}></span>
                    </div>
                </div>
            </div>

            <div className={style.bottomNav}>
                <div className={style.sortBy}>
                    <p>sort by: Most Upvotes ></p>
                </div>
                <div onClick={() => {
                    router.push('/posts/create')
                }} className={style.feedback}>
                        <p>+ Add Feedback</p>
                </div>
            </div>

            <div className={`${style.menu} ${openMenu ? style.open_menu : ''}`}>
                <Tags />
                <Roadmap />
            </div>
            {openMenu ?
                <div className={style.backDrop}>
                </div>
            : ''}
            
        </>
    )
}

export default Nav
