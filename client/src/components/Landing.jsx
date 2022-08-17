import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './styles/Landing.module.css'

export function Landing() {
    return (
        <div key={"landingContainer"} className={style.container}>
            <NavLink to={'/home'}>
                <button title={"enter button"} className={style.button}>Enter Pokédex</button>
            </NavLink>
            <h6 className={style.press}>press the button</h6>
        </div >
    )
}

export default Landing