import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './styles/Landing.module.css'

function Landing() {
    return (
        <div className={style.container}>
            <NavLink to={'/home'}>
                <h2>enter</h2>
            </NavLink>
        </div>
    )
}

export default Landing