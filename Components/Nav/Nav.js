import { useRouter } from 'next/router';

//next imports
import React, { useState, useRef } from 'react';

//css module file
import style from './Nav.module.css';

//component
import Tags from './Tags/Tags';
import Roadmap from './Roadmap/Roadmap';

// Recoil
import { useRecoilState } from 'recoil';
import { sortState } from '../../atoms/sortAtom'

function Nav() {

    const router = useRouter();

    const [openMenu, setOpenMenu] = useState(false);

    const [openSort, setOpenSort] = useState(false);

    const [sort, setSort] = useRecoilState(sortState);

    // console.log(sort);

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
                    <p>Sort By :</p>
                    <div className={style.dropdown}>
                        <button className={style.btn} onClick={() => openSort ? setOpenSort(false) : setOpenSort(true)} type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            {sort}
                        </button>
                        <div className={`${style.dropdown__menu} ${openSort ? style.open__dropdown : ''}`} aria-labelledby="dropdownMenuButton">

                            <p onClick={() => {
                                setSort('Most upVotes');
                                setOpenSort(false);
                            }} className={style.dropdown__item}>Most Upvotes</p>

                            <p onClick={() => {
                                setSort('Least upVotes');
                                setOpenSort(false);
                            }} className={style.dropdown__item}>Least Upvotes</p>

                            <p onClick={() => {
                                setSort('Most Comments');
                                setOpenSort(false);
                            }} className={style.dropdown__item}>Most Comments</p>

                            <p onClick={() => {
                                setSort('Least Comments');
                                setOpenSort(false)
                            }} className={style.dropdown__item}>Least Comments</p>

                        </div>
                    </div>

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
