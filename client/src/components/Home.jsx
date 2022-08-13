import { React, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import style from './styles/Home.module.css'
import { getPokemons, resetState, unmountBackup, filterState } from '../store/actions/index'
import Card from './Card'
import Filter from './Filter'
import Order from './Order'
import Error from './Error'

function Home() {


    let dispatch = useDispatch();


    let allPokemon = useSelector(state => state.pokemons)

    useEffect(() => {

        if (allPokemon[0] === undefined) {
            dispatch(getPokemons())
        }
    }, [dispatch]);

    // let lastOrder = useSelector(state => state.unmountBackup)
    // console.log(lastOrder[0])
    // console.log(allPokemon)

    // if (lastOrder[0] !== undefined) { allPokemon = lastOrder }



    let arrayOfPages = []
    for (let i = 0; i < allPokemon.length; i += 12) {
        arrayOfPages.push(allPokemon.slice(i, i + 12))
    }
    let [pageIndex, setPageIndex] = useState(0)


    function onCickPrev(e) {
        // console.log(e.target.value)
        e.preventDefault();
        let aux = pageIndex - 1
        if (aux < 0) { return pageIndex }
        return setPageIndex(aux)
    }
    function onCickNext(e) {
        // console.log(e.target.value)
        e.preventDefault();
        let aux = pageIndex + 1
        if (aux > arrayOfPages.length - 1) { return pageIndex }
        return setPageIndex(aux)
    }

    // let bck = useSelector(state => state.pokemons)
    // useEffect(() => {
    //     return dispatch(unmountBackup(bck))
    // })
    return (
        <div className={style.container}>

            <nav className={style.navFilterOrder}>

                {/* <h2>Home</h2> */}
                <div className={style.filterOrder}>
                    <Filter />
                    <Order /><br /><br />
                    <nav className={style.navPag}>
                        <ul className={style.ulLabel}>
                            {
                                arrayOfPages.map((page, index) => {

                                    return (

                                        <li className="pageButtons" key={index}>
                                            <a className={style.numberLink} onClick={() => setPageIndex(index)}>{index + 1} </a>
                                        </li>

                                    )
                                })
                            }
                        </ul>
                    </nav>
                    {/* {
                        if(!arrayOfPages[pageIndex]) {return(<div className="error"><Error /></div>) }
                    } */}
                    <small className={style.divPaginationText}>Page {pageIndex + 1} from {arrayOfPages.length}</small><br /><br />
                    <input type="button" value="Prev" onClick={e => onCickPrev(e)} />
                    <input type="button" value="Next" onClick={e => onCickNext(e)} />
                </div>
            </nav>

            <ul className={style.pkContainer}>
                {
                    !arrayOfPages[pageIndex] ? (
                        <div className="error">
                            <Error />
                        </div>
                    ) :


                        arrayOfPages[pageIndex]?.map((p) => {
                            return (
                                <div className={style.cardContainer}>
                                    <NavLink to={`/detail/${p.id}`} className={style.navLink}>
                                        <Card key={p.id} name={p.name} image={p.image} type={p.pokemonType} />
                                    </NavLink>
                                </div>
                            )
                        })
                }
            </ul>

        </div >
    )
}

export default Home