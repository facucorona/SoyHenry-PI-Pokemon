export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAILS = "GET_DETAILS";

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