import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import style from './styles/Detail.module.css'
import { Card } from './Card'
import { getDetails, cleanState } from '../store/actions/index'

function Detail() {
    let { id } = useParams()
    // console.log(id)

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch, id]);

    useEffect(() => {
        return dispatch(cleanState())
    }, []);



    let detailFetch = useSelector(state => state.pokemonDetail)
    let objectFetch = {}

    //termina de formatear lo que recibe del back
    if (detailFetch[0]) {
        objectFetch = detailFetch[0]
        detailFetch = objectFetch
    }
    // console.log(detailFetch)
    let varrr = document.getElementsByName("name")
    console.log(varrr)


    return (
        <div id="container" className={style.container}>

            <h1>{detailFetch.name}</h1>

            <img src={detailFetch.image} alt="image" /><br />

            <h2>Pokemon Type:</h2>
            <h3>{detailFetch.pokemonType}</h3>

            <h2>Pokemon Health Points:</h2>
            <h3>{detailFetch.hp}</h3>

            <h2>Attack:</h2>
            <h3>{detailFetch.attack}</h3>

            <h2>Defense:</h2>
            <h3>{detailFetch.defense}</h3>

            <h2>Speed:</h2>
            <h3>{detailFetch.speed}</h3>

            <h2>Weight:</h2>
            <h3>{detailFetch.weight}</h3>

            <h2>Height:</h2>
            <h3>{detailFetch.height}</h3>

            <NavLink to="/home">
                <input type="button" value="Back" />
            </NavLink>

        </div>
    )
}

export default Detail