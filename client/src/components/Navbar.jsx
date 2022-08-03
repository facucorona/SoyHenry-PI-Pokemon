import React from 'react'
import { NavLink } from 'react-router-dom'

import style from './styles/Navbar.module.css'

function Navbar() {
    return (
        <div className={style.container}>
            <h1>SoyHenry Pokedex</h1>
            <input type="text" placeholder="Search Pokemon" />
            <input type="button" value="Go!" /><br />

            <NavLink to="/add">
                <input type="button" value="New Pokemon" /><br />
            </NavLink>

        </div>
    )
}

export default Navbar