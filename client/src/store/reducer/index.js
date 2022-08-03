import {
    GET_POKEMONS,
    GET_DETAILS,
} from "../actions"

const initialState = {
    pokemons : [],
    pokemons_backup: [],
    pokemonDetail : [],
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

  case GET_POKEMONS:
    return { 
        ...state,
        pokemons: action.payload 
    }
  case GET_DETAILS:
    return { 
        ...state,
        pokemonDetail: action.payload 
    }

  default:
    return state
  }
}
