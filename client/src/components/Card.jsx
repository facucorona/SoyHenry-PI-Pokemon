import React from 'react'
import style from './styles/Card.module.css'

function Card({ name, image, type }) {
    return (
        <div className={style.container}>
            <h1>{name}</h1>
            <img className={style.image} src={image} alt={'cardPic'} /><br />
            <h2>{type}</h2>

        </div>
    )
}

export default Card