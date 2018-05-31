import { FETCH_USER } from '../actions/types';
//create a function with empty state but change it later, the default value for state is undefined
//state result is null, user model or false
export default function (state = null, action) {
  switch(action.type) {
    case FETCH_USER:
      return action.payload || false;  //false meaning return '' in JS
    default:
      return state;
  }
}
