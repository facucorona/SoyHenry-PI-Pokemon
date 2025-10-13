export const GET_POKEMONS = "GET_POKEMONS";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_STATE = "CLEAN_STATE";
export const SEARCH = "SEARCH";
export const GET_TYPES = "GET_TYPES";
export const RESET_STATE = "RESET_STATE";
export const FILTER_STATE = "FILTER_STATE";
export const FILTER_STATE_ORIGIN = "FILTER_STATE_ORIGIN";
export const ORDER_STATE = "ORDER_STATE";
export const UNMOUNT_BACKUP = "UNMOUNT_BACKUP";
export const SET_PAGE_FALSE = "SET_PAGE_FALSE";
export const CLEAN_DETAILS = "CLEAN_DETAILS";
export const DELETE_POKEMON = "DELETE_POKEMON";

export function deletePokemon(array) {
  return (dispatch) => {
    dispatch({
      type: DELETE_POKEMON,
      payload: array,
    });
  };
}

export function unmountBackup(backupArray) {
  return async (dispatch) => {
    dispatch({
      type: UNMOUNT_BACKUP,
      payload: backupArray,
    });
  };
}

export function resetState(resetArray) {
  return async (dispatch) => {
    dispatch({
      type: RESET_STATE,
      payload: resetArray,
    });
  };
}

export function setPageFalse() {
  return async (dispatch) => {
    dispatch({
      type: SET_PAGE_FALSE,
      payload: false,
    });
  };
}

export function filterState(filteredArray) {
  // console.log(filteredArray)
  return async (dispatch) => {
    dispatch({
      type: FILTER_STATE,
      payload: filteredArray,
    });
  };
}

export function filterStateOrigin(filter, array) {
  // console.log(filter)
  return async (dispatch) => {
    dispatch({
      type: FILTER_STATE_ORIGIN,
      payload: { filter, array },
    });
  };
}

export function orderState(orderedArray) {
  // console.log("orderedArray .,.,.,.,.,.,.,.,.")
  // console.log(orderedArray)
  return async (dispatch) => {
    dispatch({
      type: ORDER_STATE,
      payload: orderedArray,
    });
  };
}

export function getPokemons() {
  return async (dispatch) => {
    console.log(
      "process.env.REACT_APP_HOST_BACK: ",
      process.env.REACT_APP_HOST_BACK
    );
    await fetch(`${process.env.REACT_APP_HOST_BACK}/pokemons`)
      .then((p) => p.json() && console.log("p.json(): ", p.json()))
      .then((arrayFetch) => {
        console.log("arrayFetch: ", arrayFetch);
        dispatch({
          type: GET_POKEMONS,
          payload: arrayFetch,
        });
      });
  };
}

export function getTypes() {
  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_HOST_BACK}/types`)
      .then((p) => p.json())
      .then((arrayFetch) => {
        dispatch({
          type: GET_TYPES,
          payload: arrayFetch,
        });
      });
  };
}

export function getDetails(id) {
  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_HOST_BACK}/pokemons/${id}`)
      .then((p) => p.json())
      .then((arrayFetch) => {
        dispatch({
          type: GET_DETAILS,
          payload: arrayFetch,
        });
      });
  };
}
export function cleanDetails() {
  return (dispatch) => {
    dispatch({
      type: CLEAN_DETAILS,
      payload: [],
    });
  };
}

export function cleanState() {
  return (dispatch) => {
    dispatch({
      type: CLEAN_STATE,
      payload: [],
    });
  };
}

export function search(pk) {
  return async (dispatch) => {
    await fetch(`${process.env.REACT_APP_HOST_BACK}/pokemons/?name=${pk}`)
      .then((p) => p.json())
      .then((arrayFetch) => {
        dispatch({
          type: SEARCH,
          payload: arrayFetch,
        });
      });
  };
}
