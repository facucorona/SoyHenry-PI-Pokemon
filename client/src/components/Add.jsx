import { React, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import style from './styles/Add.module.css'
import { getTypes } from '../store/actions/index'

function Add() {

    let dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    let typesFetch = useSelector(state => state.types)

    let [selectedTypes, setSelectedTypes] = useState([])
    let [newPokemonObject, setNewPokemonObject] = useState()

    function handleChange(e) {
        e.preventDefault();
        console.log(e.target)
        setNewPokemonObject({ ...newPokemonObject, [e.target.name]: e.target.value })
        console.log(newPokemonObject)
    }

    function handleSelectChange(e) {

        if (selectedTypes.includes(e.target.value)) {
            return (
                setNewPokemonObject({ ...newPokemonObject, [e.target.name]: selectedTypes })
            )
        }

        setSelectedTypes([...selectedTypes, e.target.value])
        let string = selectedTypes.toString(", ")
        setNewPokemonObject({ ...newPokemonObject, [e.target.name]: string })
    }

    async function onSubmit(e) {
        e.preventDefault();

        await fetch('http://localhost:3001/pokemons/', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.    
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPokemonObject) // body data type must match "Content-Type" header
        });
    }

    function onClickType(e) {
        e.preventDefault();

        let arrayTypes = selectedTypes
        arrayTypes = arrayTypes.filter(t => t !== e.target.id)
        let string = arrayTypes.toString()
        setSelectedTypes(arrayTypes)
        setNewPokemonObject({ ...newPokemonObject, pokemonType: string })
    }


    return (
        <div className={style.container}>
            <h2>New Pokemon on Pokedex</h2>
            <br />
            <br />
            <form>
                <input onChange={e => handleChange(e)} type="text" placeholder="Name" name="name" /> <br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Health Points" min="0" name="hp" /><br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Defense" min="0" name="defense" /><br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Attack" min="0" name="attack" /><br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Speed" min="0" name="speed" /><br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Weight" min="0" name="weight" /><br /><br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Height" min="0" name="height" /><br /><br />

                <h4>Select Types</h4>
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

                <h3>{selectedTypes.map(t => <div onClick={onClickType} id={t} value={t}>{t}</div>)}</h3>

                <input onChange={e => handleChange(e)} type="text" placeholder="Image" name="image" /><br /><br />

                <input type="button" value="Go!" onClick={e => onSubmit(e)} /><br />
            </form>
            <NavLink to="/home">
                <input type="button" value="Back Home" />
            </NavLink>
        </div>
    )
}

export default Add