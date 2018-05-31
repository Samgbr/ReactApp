import axios from 'axios';
import { FETCH_USER } from './types';
//Action creator
//Redux thunk will see the function, we request then get the result for the API
//Refactor fetch user using async await and arrow function
export const fetchUser = () => //{
  /*return function*/ async dispatch => {
    //This return promise
    const res = await axios.get('/api/current_user')
    /*.then(res =>*/ dispatch({ type: FETCH_USER, payload: res.data})/*)*/;  //promise refactored
  };

//  return {
//    type: FETCH_USER,
//    payload: request
//  };

//};
//export is important
