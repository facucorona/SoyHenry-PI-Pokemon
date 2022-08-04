import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './styles/Filter.module.css'
import { getTypes, filterState, resetState } from '../store/actions/index'

function Filter() {
    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    let disabledReset = true;
    let typesFetch = useSelector(state => state.types)
    let pokemonsState = useSelector(state => state.pokemons_backup)
    let backupState = pokemonsState

    let [filteredPokemons, setFilteredPokemons] = useState()

    let filtered = []
    function handleSelectChange(e) {
        e.preventDefault();
        console.log(e.target.value)
        pokemonsState.forEach(p => {
            if (p.pokemonType.includes(e.target.value)) {
                filtered.push(p)
            }
        })
        setFilteredPokemons(filtered)
    }

    useEffect(() => {
        if (filteredPokemons !== undefined) { dispatch(filterState(filteredPokemons)) }
    }, [dispatch, filteredPokemons])

    function onClickReset() {
        // dispatch(filterState(pokemonsState));
        setFilteredPokemons(backupState)
    }

    return (
        <div className={style.container}>
            <h4>Filter by Type</h4>
            <select id={'typeSelector'} defaultValue={""} name={"pokemonType"} onChange={e => handleSelectChange(e)}>
                <option value="">Select Type</option>
                {
                    typesFetch?.map(type => {
                        return (
                            <option name={type} value={type}>{type}</option>
                        )
                    })
                }
            </select><br /><br />
            {
                //boton reset apagado, si se selecciona un filtro se activa
                (filteredPokemons !== undefined) ? (disabledReset = false)
                    : (disabledReset)
            }
            <button disabled={disabledReset} onClick={onClickReset}>Reset</button>
        </div>
    )
}

export default Filter