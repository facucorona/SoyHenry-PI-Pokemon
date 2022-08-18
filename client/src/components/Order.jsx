import { React } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { orderState } from '../store/actions/index'
import style from './styles/Order.module.css'

function Order() {

    let fullPokemons = useSelector(state => state.pokemons);
    let full = fullPokemons
    let full2 = fullPokemons
    let backupPokemons = useSelector(state => state.pokemons_backup);

    let dispatch = useDispatch();

    function handleChange(e) {
        e.preventDefault();
        //arma array con los nombres, lo ordena,y luego busca los pkmn en ese orden        
        let arrName = fullPokemons.map(p => p.name)
        arrName.sort()
        let orderedAlph = []
        for (let i = 0; i < fullPokemons.length; i++) {
            full.forEach(p => {
                if (p.name === arrName[i]) {
                    orderedAlph.push(p)
                    //vacía 
                    p = []
                }
            })
        }
        let arrAtt = fullPokemons.map(p => {
            return p.attack
        })

        //elimina los valores duplicados en el array
        arrAtt = [...new Set(arrAtt)]
        arrAtt.sort(function (a, b) { return a - b });
        // console.log(arrAtt)
        let orderedAttack = []
        for (let i = 0; i < arrAtt.length; i++) {
            full2.forEach(p => {
                if (p.attack === arrAtt[i]) {
                    orderedAttack.push(p)
                }
            })
        }

        let arrPokedex = backupPokemons.map(p => p.id)
        let orderedPokedex = []
        for (let i = 0; i < arrPokedex.length; i++) {
            full2.forEach(p => {
                if (p.id === arrPokedex[i]) {
                    orderedPokedex.push(p)
                }
            })
        }

        //hacer funcion para ordenar por id, para opc. "not"

        if (e.target.value === "not") { dispatch(orderState(orderedPokedex)) }
        if (e.target.value === "abc") { dispatch(orderState(orderedAlph)) }
        if (e.target.value === "zyx") { dispatch(orderState(orderedAlph.reverse())) }
        if (e.target.value === "attasc") { dispatch(orderState(orderedAttack)) }
        if (e.target.value === "attdesc") { dispatch(orderState(orderedAttack.reverse())) }
    }

    return (
        <div className={style.container}>
            <label>Select Order</label><br />
            <select id={'orderSelector'} defaultValue="not" onChange={e => handleChange(e)}>
                <option value="not">Pokédex ID</option>
                <option value="abc">ABC</option>
                <option value="zyx">ZYX</option>
                <option value="attasc">Attack ASC</option>
                <option value="attdesc">Attack DESC</option>
            </select>
        </div>
    )
}

export default Order