import { React, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import style from './styles/Navbar.module.css'
import { search } from '../store/actions/index'

function Navbar() {
    let [searchState, setSearchState] = useState("");

    let dispatch = useDispatch();
    function onSubmitSearch(e) {
        e.preventDefault();
        dispatch(search(searchState))
    }

    function onChangeSearch(e) {
        e.preventDefault();
        setSearchState(e.target.value)
        // console.log(searchState)
    }

    return (
        <div className={style.container}>
            <div className={style.logoHenry}>
                <NavLink to="/">

                    <img src="https://assets.soyhenry.com/LOGO-REDES-01_og.jpg" alt="" className={style.henryLogo} height="60px" />
                </NavLink>
                <h1 className={style.head}>SoyHenry Pokédex</h1>
            </div>

            <form onSubmit={onSubmitSearch} className={style.searchForm}>
                <input type="text" placeholder="Search Pokémon" onChange={onChangeSearch} value={searchState} />
                <input type="submit" value="Go!" /><br />
                <small className={style.small} >Empty Search for All Pokémon</small><br /><br />
            </form>


            <NavLink to="/add" className={style.addButton}>
                <input className={style.button} type="button" value="New Pokémon" /><br />
            </NavLink>

        </div>
    )
}

export default Navbar