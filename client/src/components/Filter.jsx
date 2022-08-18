import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './styles/Filter.module.css'
import { getTypes, filterState, filterStateOrigin, getPokemons, cleanState } from '../store/actions/index'

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
        if (filteredPokemons !== undefined) { dispatch(filterState(filteredPokemons)) }
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
            <label>Filter by Type</label><br />
            <select id={'typeSelector'} defaultValue={""} name={"pokemonType"} onChange={e => handleSelectChange(e)}>
                <option value="">~ All ~</option>
                {
                    typesFetch?.map(type => {
                        return (
                            <option key={type} name={type} value={type}>{type}</option>
                        )
                    })
                }
            </select><br /><br />
            <label>Filter by Origin</label><br />
            <select id={'originSelector'} defaultValue={""} name={"pokemonOrigin"} onChange={e => handleSelectChangeOrigin(e)}>
                <option value="">~ All ~</option>
                <option value="db">Created</option>
                <option value="api">Existing</option>
            </select><br /><br />
            <label hidden={notFound}>Not Found</label><br /><br />

            {/* {
                //boton reset apagado, si se selecciona un filtro se activa
                (filteredPokemons !== undefined) ? (disabledReset = false)
                    : (disabledReset)
            } */}
            <button onClick={onClickReset}>Reset</button><br /><br /><br />
        </div>
    )
}

export default Filter