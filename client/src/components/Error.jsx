import React from 'react'
import style from './styles/Error.module.css'

function Error() {
    return (
        <div className={style.container}>
            <img className={style.image} src="https://cdn.dribbble.com/users/1008697/screenshots/2853651/pokeball.gif" alt={"errorPic"}></img>
        </div>
    )
}

export default Error