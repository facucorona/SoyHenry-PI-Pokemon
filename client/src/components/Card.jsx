import React from 'react'
import { NavLink } from 'react-router-dom'
import style from './styles/Card.module.css'

function Card({ name, image, type }) {
    return (
        <div className={style.container}>
            <h1>{name}</h1>
            <h2>{type}</h2>
            <img src={image} alt="image" /><br />

        </div>
    )
}

export default Card