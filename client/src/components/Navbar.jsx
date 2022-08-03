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
        console.log(searchState)
    }

    return (
        <div className={style.container}>
            <h1>SoyHenry Pokedex</h1>

            <form onSubmit={onSubmitSearch}>
                <input type="text" placeholder="Search Pokemon" onChange={onChangeSearch} value={searchState} />
                <input type="submit" value="Go!" /><br />
            </form>


            <NavLink to="/add">
                <input type="button" value="New Pokemon" /><br />
            </NavLink>

        </div>
    )
}

export default Navbar