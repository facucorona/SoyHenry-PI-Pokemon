import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './styles/Add.module.css'

function Add() {


    function handleChange(e) {
        e.preventDefault();
    }

    function handleSelectChange(e) {
        e.preventDefault();
    }

    function onSubmit(e) {
        e.preventDefault();
    }



    return (
        <div className={style.container}>
            <h2>New Pokemon on Pokedex</h2>
            <br />
            <br />
            <form>
                <input onChange={e => handleChange(e)} type="text" placeholder="Name" /> <br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Health Points" min="0" /><br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Defense" min="0" /><br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Attack" min="0" /><br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Speed" min="0" /><br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Weight" min="0" /><br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Height" min="0" /><br /><br />

                <h4>Select Types</h4>
                <select placeholder="Type/s" /><br /><br />
                <input onChange={e => handleSelectChange(e)} type="text" placeholder="Image" /><br /><br />

                <input type="button" value="Go!" onSubmit={e => onSubmit(e)} /><br />
            </form>
            <NavLink to="/home">
                <input type="button" value="Back Home" />
            </NavLink>
        </div>
    )
}

export default Add