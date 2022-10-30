import { React, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import Error from './Error'
import style from './styles/Detail.module.css'
import { getDetails, cleanDetails, deletePokemon } from '../store/actions/index'


export function Detail() {
    let { id } = useParams()
    // console.log(id)

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails(id))
    }, [dispatch, id]);

    useEffect(() => {
        return (dispatch(cleanDetails()))
    }, [dispatch]);


    let detailFetch = useSelector(state => state.pokemonDetail)
    let objectFetch = {}

    //termina de formatear lo que recibe del back
    if (detailFetch[0]) {
        objectFetch = detailFetch[0]
        detailFetch = objectFetch
    }

    let pokemonsState = useSelector(state => state.pokemons)
    let pokemonsBackupState = useSelector(state => state.pokemons_backup)


    let arrayDeleted = []
    async function deleteThisPokemon(e) {

        e.preventDefault();
        var opcion = window.confirm("Confirma que desea eliminar el Pokémon?");

        if (opcion === true) {

            let responseDelete = await fetch(`${process.env.REACT_APP_HOST_BACK}:${process.env.PORT}/pokemons/delete/${detailFetch.id}`, {
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.    
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify(detailFetch.id) // body data type must match "Content-Type" header
            })



            pokemonsState = pokemonsState.filter((p) => {
                if (p.id !== detailFetch.id) { return p }
            })
            pokemonsBackupState = pokemonsBackupState.filter((p) => {
                if (p.id !== detailFetch.id) { return p }
            })
            arrayDeleted[0] = pokemonsState;
            arrayDeleted[1] = pokemonsBackupState;

            dispatch(deletePokemon(arrayDeleted))
            alert("Pokémon eliminado!")
            window.location.href = "/home";

            //verificar que redirecciona al home pero no borra el pokémon
        } else {
            return
        }
    }

    useEffect(() => {
    }, [arrayDeleted])

    return (
        <div id="container" className={style.container}>
            {
                (detailFetch.image === undefined) && (
                    <div className="error">
                        <Error />
                    </div>
                )
            }

            <h1>{detailFetch.name}</h1>

            <img src={detailFetch.image} alt="detailImage" /><br />

            <h2>Pokemon Type:</h2>
            <h3> {detailFetch.pokemonType}</h3>

            <h2>Pokemon Health Points:</h2>
            <h3>{detailFetch.hp}</h3>
            {/* <progress>{detailFetch.hp}</progress> */}

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

            <h2>Pokédex ID:</h2>
            <h3>{detailFetch.id}</h3>

            <div className="editbuttons">
                {typeof detailFetch.id !== "number" && <input type="button" value="Delete" onClick={e => deleteThisPokemon(e)} />}
                {typeof detailFetch.id !== "number" &&

                    <NavLink to={`/edit/${detailFetch.id}`}>
                        <input type="button" value="Edit" />
                    </NavLink>


                }
            </div><br />

            <NavLink to="/home">
                <input type="button" value="Back" />
            </NavLink>

        </div>
    )
}

export default Detail