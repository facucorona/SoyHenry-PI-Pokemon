import {
    GET_POKEMONS,
    GET_DETAILS,
    CLEAN_STATE,
    SEARCH,
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
  case CLEAN_STATE:
    return { 
        ...state,
        pokemonDetail: action.payload 
    }

  case SEARCH:
    console.log(action.payload)
    return { 
        ...state,
        pokemons_backup: state.pokemons,
        pokemons: action.payload,
    }

  default:
    return state
  }
}
