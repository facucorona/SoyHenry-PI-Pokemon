import {
    GET_POKEMONS,
    GET_DETAILS,
    CLEAN_STATE,
    SEARCH,
    GET_TYPES,
    RESET_STATE,
    FILTER_STATE,
    ORDER_STATE
} from "../actions"

const initialState = {
    pokemons : [],
    pokemons_backup: [],
    pokemonDetail : [],
    types : []
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

  case RESET_STATE:
    return { 
        ...state,
        pokemons: state.pokemons_backup,        
    }
  case ORDER_STATE:
    return { 
        ...state,
        pokemons: action.payload,        
    }
  case FILTER_STATE:
    return { 
        ...state,        
        pokemons: action.payload 
    }
  case GET_POKEMONS:
    return { 
        ...state,
        pokemons: action.payload,
        pokemons_backup: action.payload, 
    }
  case GET_TYPES:
    return { 
        ...state,
        types: action.payload 
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
