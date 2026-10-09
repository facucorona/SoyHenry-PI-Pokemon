import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './styles/Filter.module.css'
import { getTypes, filterState, filterStateOrigin, getPokemons, cleanState, setPageFalse } from '../store/actions/index'

function Filter() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])


    let typesFetch = useSelector(state => state.types)
    typesFetch.sort()
    let pokemonsState = useSelector(state => state.pokemons_backup)
    let pokemonsMain = useSelector(state => state.pokemons)
    let backupState = pokemonsState

    let [filteredPokemons, setFilteredPokemons] = useState()

    let filtered = []
    function handleSelectChange(e) {
        e.preventDefault();
        document.getElementById("originSelector").value = "";
        pokemonsState.forEach(p => {
            if (p.pokemonType.includes(e.target.value)) {
                filtered.push(p)
            }
        })
        setFilteredPokemons(filtered)

        // hace backup del estado actual para cuando se vuelva a montar el componente       
    }
    let notFound = true;


    function handleSelectChangeOrigin(e) {
        e.preventDefault();
        // console.log(e.target.value)
        let arrayDispatch = []
        if (filteredPokemons !== undefined) { arrayDispatch = filteredPokemons }
        if (filteredPokemons === undefined) { arrayDispatch = pokemonsMain }


        dispatch(filterStateOrigin(e.target.value, arrayDispatch))
    }

    useEffect(() => {
        if (filteredPokemons !== undefined) {
            dispatch(filterState(filteredPokemons))
            // dispatch(setPageFalse())
        }
    }, [dispatch, filteredPokemons])

    function onClickReset() {
        document.getElementById("typeSelector").value = "";
        document.getElementById("originSelector").value = "";
        setFilteredPokemons(backupState)
        dispatch(cleanState())
        dispatch(getPokemons())
    }



    return (
        <div className={style.container}>
            {/* Los <br /> que separaban label y select estorban: en un
                contenedor flex cada uno se vuelve un item extra y suma
                separaciones. El espacio lo da `gap` en el CSS. */}
            <label htmlFor="typeSelector">Filter by Type</label>
            <select id={'typeSelector'} defaultValue={""} name={"pokemonType"} onChange={e => handleSelectChange(e)}>
                <option value="">~ All ~</option>
                {
                    typesFetch?.map(type => {
                        return (
                            <option key={type} name={type} value={type}>{type}</option>
                        )
                    })
                }
            </select>

            <label htmlFor="originSelector">Filter by Origin</label>
            <select id={'originSelector'} defaultValue={""} name={"pokemonOrigin"} onChange={e => handleSelectChangeOrigin(e)}>
                <option value="">~ All ~</option>
                <option value="db">Created</option>
                <option value="api">Existing</option>
            </select>

            <button onClick={onClickReset}>Reset</button>
        </div>
    )
}

export default Filter