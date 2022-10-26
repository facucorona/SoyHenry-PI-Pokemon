import {
    GET_POKEMONS,
    GET_DETAILS,
    CLEAN_STATE,
    SEARCH,
    GET_TYPES,
    RESET_STATE,
    FILTER_STATE,
    FILTER_STATE_ORIGIN,
    ORDER_STATE,
    SET_PAGE_FALSE,  
    CLEAN_DETAILS,  
    DELETE_POKEMON,
} from "../actions"

const initialState = {
    types : [],

    pokemons : [],
    pokemons_backup: [],
    prev : [],
    
    pokemonDetail : [],
    page: false,
}

export default function rootReducer(state = initialState, action) {
  switch (action.type) {

  case DELETE_POKEMON:
    return {
      ...state,
      pokemons: action.payload[0],
      pokemons_backup: action.payload[1],
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
      pokemons: action.payload, 
      page:true,
    }
    case SET_PAGE_FALSE:      
    return { 
      ...state,                
      page:action.payload,
    }
    case FILTER_STATE_ORIGIN:
      let result=[]
      // console.log("action.payload{{{{{{{{{{{{")
      // console.log(action.payload)
      
      state.prev=state.pokemons;
      if (action.payload.filter===""){result=action.payload.array}
      
      if (action.payload.filter==="db"){result=action.payload.array.filter(p => p.id.length > 8)}
      
      if (action.payload.filter==="api"){result=action.payload.array.filter(p => typeof (p.id) === "number")}
      // console.log("result{{{{{{{{{{{{")
      // console.log(result)
      return { 
        ...state,                
        pokemons: result, 
        page:true,
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
    case CLEAN_DETAILS:
      return { 
          ...state,
          pokemonDetail: [],        
      }
  case CLEAN_STATE:
    return { 
        ...state,
        pokemonDetail: action.payload ,
        pokemons:action.payload
      }

  case SEARCH:
    // console.log(action.payload)
    return { 
        ...state,
        pokemons_backup: state.pokemons,
        pokemons: action.payload,
    }

  default:
    return state
  }
}
