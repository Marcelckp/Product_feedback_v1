import { useRouter } from 'next/router';

//next imports
import React, { useState } from 'react'

//css module file
import style from './Nav.module.css'

function Nav() {

    const router = useRouter()

    const [openMenu, setOpenMenu] = useState(false);

    // console.log(openMenu)
    return (
        <>

            <div className={style.container}>
                <div className={style.titleSection}>
                    <p>Feedback Board</p>
                </div>
                <div className={style.burger} onClick={() => {
                    openMenu ? setOpenMenu(false) : setOpenMenu(true)
                }}>
                    <p>burger menu</p>
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
                
            </div>
            {openMenu ?
                <div className={style.backDrop}>
                    {/* <p>menu</p> */}
                </div>
            : ''}
            
        </>
    )
}

export default Nav
