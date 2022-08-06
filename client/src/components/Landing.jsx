import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './styles/Landing.module.css'

function Landing() {
    return (
        <div key={"landingContainer"} className={style.container}>
            <NavLink to={'/home'}>
                <button className={style.button}>Enter Pokédex</button>
            </NavLink>
        </div>
    )
}

export default Landing