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


    let regExpName = RegExp(/^[a-zA-Z]+$/)
    let regExpNumber = RegExp(/^[0-9]+$/)
    let regExpUrl = RegExp(/^(https?:\/\/.*\.(?:jpg|jpeg|gif))$/)


    let [nameAdvert, setNameAdvert] = useState(false)
    let [hpAdvert, setHpAdvert] = useState(false)
    let [defenseAdvert, setDefenseAdvert] = useState(false)
    let [attackAdvert, setAttackAdvert] = useState(false)
    let [speedAdvert, setSpeedAdvert] = useState(false)
    let [weightAdvert, setWeightAdvert] = useState(false)
    let [heightAdvert, setHeightAdvert] = useState(false)
    let [imageAdvert, setImageAdvert] = useState(false)
    let [typeAdvert, setTypeAdvert] = useState(false)
    let [addedTypeAdvert, setAddedTypeAdvert] = useState(true)
    let [globalAdvert, setGlobalAdvert] = useState(true)

    function handleChange(e) {
        e.preventDefault();

        if (e.target.name === "name") {
            if (!regExpName.test(e.target.value)) { setNameAdvert(false) }
            else {
                setNameAdvert(true)
                setNewPokemonObject({ ...newPokemonObject, [e.target.name]: e.target.value })
            }
        }
        if (e.target.name === "hp") {
            if (!regExpNumber.test(e.target.value) || (!e.target.value > 0)) { setHpAdvert(false) }
            else {
                setHpAdvert(true);
                setNewPokemonObject({ ...newPokemonObject, [e.target.name]: e.target.value })

            }
        }
        if (e.target.name === "defense") {
            if (!regExpNumber.test(e.target.value) || (!e.target.value > 0)) { setDefenseAdvert(false) }
            else {
                setDefenseAdvert(true);
                setNewPokemonObject({ ...newPokemonObject, [e.target.name]: e.target.value })

            }
        }
        if (e.target.name === "attack") {
            if (!regExpNumber.test(e.target.value) || (!e.target.value > 0)) { setAttackAdvert(false) }
            else {
                setAttackAdvert(true);
                setNewPokemonObject({ ...newPokemonObject, [e.target.name]: e.target.value })
            }
        }
        if (e.target.name === "speed") {
            if (!regExpNumber.test(e.target.value) || (!e.target.value > 0)) { setSpeedAdvert(false) }
            else {
                setSpeedAdvert(true);
                setNewPokemonObject({ ...newPokemonObject, [e.target.name]: e.target.value })

            }
        }
        if (e.target.name === "weight") {
            if (!regExpNumber.test(e.target.value) || (!e.target.value > 0)) { setWeightAdvert(false) }
            else {
                setWeightAdvert(true);
                setNewPokemonObject({ ...newPokemonObject, [e.target.name]: e.target.value })

            }
        }
        if (e.target.name === "height") {
            if (!regExpNumber.test(e.target.value) || (!e.target.value > 0)) { setHeightAdvert(false) }
            else {
                setHeightAdvert(true);
                setNewPokemonObject({ ...newPokemonObject, [e.target.name]: e.target.value })

            }
        }
        if (e.target.name === "image") {
            if (!regExpUrl.test(e.target.value)) { setImageAdvert(false) }
            else {
                setImageAdvert(true);
                setNewPokemonObject({ ...newPokemonObject, [e.target.name]: e.target.value })
                // console.log(newPokemonObject)

            }
        }
        setNewPokemonObject({ ...newPokemonObject, [e.target.name]: e.target.value })
        setGlobalAdvert(true)
    }

    function handleSelectChange(e) {
        // console.log(document.getElementById("typeSelector").value)

        setAddedTypeAdvert(true)
        let currentValue = document.getElementById("typeSelector").value
        if (currentValue === "") { return selectedTypes }
        if (selectedTypes === []) { setTypeAdvert(false) }
        if ((selectedTypes.length + 1) === 3) { return setTypeAdvert(false) }
        if (selectedTypes.includes(currentValue)) {
            setAddedTypeAdvert(false)
            return selectedTypes
        }
        else {
            setTypeAdvert(true)
            setSelectedTypes([...selectedTypes, document.getElementById("typeSelector").value])
        }
        // console.log(newPokemonObject)

    }
    let [createdOk, setCreatedOk] = useState(true)
    let [addedTypes, setAddedTypes] = useState(true)

    async function onSubmit(e) {
        e.preventDefault();
        setGlobalAdvert(true)
        if (nameAdvert === false || hpAdvert === false || defenseAdvert === false || attackAdvert === false || speedAdvert === false || weightAdvert === false || heightAdvert === false || imageAdvert === false || typeAdvert === false) {
            setGlobalAdvert(false)

        } else {

            setGlobalAdvert(true)
            // await fetch(`${process.env.REACT_APP_HOST_BACK}/pokemons`, {
            await fetch(`https://soyhenry-pi-pokemon-production.up.railway.app/pokemons/`, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.    
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPokemonObject) // body data type must match "Content-Type" header
            });
            setCreatedOk(false)
        }
        // window.location.href = "/home";
    }

    function onClickType(e) {
        e.preventDefault();

        let arrayTypes = selectedTypes
        arrayTypes = arrayTypes.filter(t => t !== e.target.id)
        let string = arrayTypes.toString()
        if (string === "" || selectedTypes === []) {
            setTypeAdvert(false)
        }
        setSelectedTypes(arrayTypes)
        setNewPokemonObject({ ...newPokemonObject, pokemonType: string })
    }

    function addTypes(e) {
        e.preventDefault();
        let string = selectedTypes.toString(", ")
        setNewPokemonObject({ ...newPokemonObject, ["pokemonType"]: string })
        setAddedTypes(false)

    }



    return (
        <div className={style.container}>
            <h1>New Pokemon on Pokedex</h1>
            <br />
            <br />
            <form>
                <label>Name </label> <br />
                <input onChange={e => handleChange(e)} type="text" placeholder="Name" name="name" /><br />
                <small className={style.allow} hidden={nameAdvert}>Numbers & Symbols not allowed.</small><br /> <br />

                <label>Health Points </label> <br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Health Points" min="0" name="hp" /><br />
                <small className={style.allow} hidden={hpAdvert}>Only Natural Numbers allowed.</small><br /> <br />

                <label>Defense </label> <br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Defense" min="0" name="defense" /><br />
                <small className={style.allow} hidden={defenseAdvert}>Only Natural Numbers allowed.</small><br /> <br />

                <label>Attack </label> <br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Attack" min="0" name="attack" /><br />
                <small className={style.allow} hidden={attackAdvert}>Only Natural Numbers allowed.</small><br /> <br />

                <label>Speed </label> <br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Speed" min="0" name="speed" /><br />
                <small className={style.allow} hidden={speedAdvert}>Only Natural Numbers allowed.</small><br /> <br />

                <label>Weight </label> <br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Weight" min="0" name="weight" /><br />
                <small className={style.allow} hidden={weightAdvert}>Only Natural Numbers allowed.</small><br /> <br />

                <label>Height </label> <br />
                <input onChange={e => handleChange(e)} type="number" placeholder="Height" min="0" name="height" /><br />
                <small className={style.allow} hidden={heightAdvert}>Only Natural Numbers allowed.</small><br /> <br />

                <label>Select Types:</label> <br />
                <small className={style.allow} hidden={addedTypeAdvert}>Value already chosen.</small><br />
                <select id={'typeSelector'} defaultValue={""} name={"pokemonType"} onChange={e => handleSelectChange(e)}>
                    <option value="">Select Type</option>
                    {
                        typesFetch?.map(type => {
                            return (
                                <option key={type} name={type} value={type}>{type}</option>
                            )
                        })
                    }
                </select><br />
                <input type="button" value="Ok! Add Types" onClick={e => addTypes(e)} /><br />
                <small className={style.allow} hidden={typeAdvert}>Select 1 or 2 types.</small><br />

                <h3>{selectedTypes.map(t => <div key={t} onClick={onClickType} id={t} value={t}>{t}</div>)}</h3>
                <success className={style.created} hidden={addedTypes}>Type/s added!</success> <br />

                <label>Picture URL </label> <br />
                <input onChange={e => handleChange(e)} type="url" placeholder="Image" name="image" /><br />
                <small className={style.allow} hidden={imageAdvert}>Insert a valid Image URL-JPG, JPEG, GIF</small><br />


                <input type="button" value="Go!" onClick={e => onSubmit(e)} /><br />
                <small className={style.allow} hidden={globalAdvert}>Please Fill all fields correctly.</small><br />
                <success className={style.created} hidden={createdOk}>Pokémon Created with Success!</success> <br />
            </form><br /><br />
            <NavLink to="/home">
                <input type="button" value="Back Home" />
            </NavLink>
        </div>
    )
}

export default Add