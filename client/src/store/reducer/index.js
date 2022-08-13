import {
    GET_POKEMONS,
    GET_DETAILS,
    CLEAN_STATE,
    SEARCH,
    GET_TYPES,
    RESET_STATE,
    FILTER_STATE,
    ORDER_STATE,
    UNMOUNT_BACKUP,
} from "../actions"

const initialState = {
    pokemons : [],
    pokemons_backup: [],
    pokemonDetail : [],
    types : [],
    unmountBackup : [],

}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

  case UNMOUNT_BACKUP:
    return { 
        ...state,
        unmountBackup: action.payload,        
    }
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
    let pyld =[];
    state.pokemons[0]===undefined?pyld=action.payload:pyld=state.pokemons
    
    return { 
        ...state,
        
        pokemons: pyld,
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
        pokemonDetail: action.payload ,
        pokemons:action.payload
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
