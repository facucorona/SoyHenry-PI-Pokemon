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

                    <img src="https://assets.soyhenry.com/LOGO-REDES-01_og.jpg" alt="" className={style.henryLogo} height="44px" />
                </NavLink>
                <h1 className={style.head}>SoyHenry Pokédex</h1>
            </div>

            {/* Los <br /> que separaban los campos estorban con el layout flex:
                el espacio ahora lo dan gap y padding en el CSS. */}
            <form onSubmit={onSubmitSearch} className={style.searchForm} role="search">
                <input
                    type="text"
                    aria-label="Search Pokémon"
                    placeholder="Search Pokémon"
                    onChange={onChangeSearch}
                    value={searchState}
                />
                <input type="submit" value="Go!" />
                <small className={style.small}>Empty Search for All Pokémon</small>
            </form>

            {/* Antes era un <input type="button"> dentro del <a>, que es HTML
                inválido (interactivo dentro de interactivo) y no era reachable
                con teclado como un control. Ahora el link es el botón. */}
            <NavLink to="/add" className={`${style.addButton} ${style.button}`}>
                New Pokémon
            </NavLink>

        </div>
    )
}

export default Navbar