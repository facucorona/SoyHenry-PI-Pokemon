import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import style from './styles/Home.module.css'
import { getPokemons } from '../store/actions/index'
import Card from './Card'

function Home() {


    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPokemons())
    }, [dispatch]);

    let allPokemon = useSelector(state => state.pokemons)
    // console.log(allPokemon)

    let arrayOfPages = []
    for (let i = 0; i < allPokemon.length; i += 12) {
        arrayOfPages.push(allPokemon.slice(i, i + 12))
    }
    let [pageIndex, setPageIndex] = useState(0)

    // function onClickPage(e) {
    //     // e.preventDefault();
    //     console.log(e)
    // }
    function onCickPrev(e) {
        console.log(e)
        e.preventDefault();
        let aux = pageIndex - 1
        if (aux < 0) { return pageIndex }
        return setPageIndex(aux)
    }
    function onCickNext(e) {
        console.log(e)
        e.preventDefault();
        let aux = pageIndex + 1
        if (aux > arrayOfPages.length - 1) { return pageIndex }
        return setPageIndex(aux)
    }

    return (
        <div className={style.container}>
            <h2>Home</h2>
            <div>Page {pageIndex + 1} from {arrayOfPages.length}</div>
            {/* <div>Page <input placeholder={pageIndex + 1} /> from {arrayOfPages.length}</div> */}
            <input type="button" value="Prev" onClick={e => onCickPrev(e)} />
            <input type="button" value="next" onClick={e => onCickNext(e)} />
            {
                (arrayOfPages === []) ? (<div>
                    <h1>loading...</h1>
                </div>) :
                    arrayOfPages[pageIndex]?.map((p) => {
                        return (
                            <div className={style.cardContainer}>
                                <NavLink to={`/detail/${p.id}`} className={style.navLink}>
                                    <Card key={p.id} name={p.name} image={p.image} type={p.pokemonType} />
                                    {/* <input type="button" value="More" /> */}
                                </NavLink>
                            </div>
                        )
                    })
            }

        </div >
    )
}

export default Home