import React from "react";
import {Link} from 'react-router-dom'
import style from '../Landing/Landing.module.css'

function Landing () {
    return (
        <div className={style.main_container}>
            <div className={style.main_left_container}>
                <h1 className={style.title}>Bienvenidos a DOG-GO</h1>
                <p className={style.subtitle}>Tu perrera favorita</p>
                <Link to='/home'>
                    <button className={style.button}>Ingresar</button>
                </Link>
            </div>
        </div>
    )
}

export default Landing;
