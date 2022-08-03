export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_STATE = "CLEAN_STATE";
export const SEARCH = "SEARCH";

export function getPokemons(){
    return async (dispatch) => {
        await fetch(`http://localhost:3001/pokemons`)
        .then(p=>p.json())
        .then((arrayFetch)=>{
            dispatch({
                type: GET_POKEMONS,
                payload: arrayFetch,
            })

        })
        
    }
}

export function getDetails(id){
    return async (dispatch) => {
        await fetch(`http://localhost:3001/pokemons/${id}`)
        .then(p=>p.json())
        .then((arrayFetch)=>{
            dispatch({
                type: GET_DETAILS,
                payload: arrayFetch,
            })

        })
        
    }
}

export function cleanState(){
    return (dispatch)=>{
        dispatch({
            type: CLEAN_STATE,
            payload: [],
        })
    }
}

export function search(pk){
    return async (dispatch) => {
        await fetch(`http://localhost:3001/pokemons/?name=${pk}`)
        .then(p=>p.json())
        .then((arrayFetch)=>{
            dispatch({
                type: SEARCH,
                payload: arrayFetch,
            })

        })
        
    }
}
