//We have to include file extension if it is other than JS file for webpack to compile
//No need to create a variable like other JS imports -  not used by webpack
import 'materialize-css/dist/css/materialize.min.css';
//Set Root component to the dom to show on the browser
import React from 'react';
import ReactDOM from 'react-dom';
//import the provider from the react-redux
import { Provider } from 'react-redux';
//createStore - creates an instance of redux store
import { createStore , applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';


import App from './components/App';
import reducers from './reducers';
//Here we created an empty array store but the actual reducers are declared with actual reducers that is
//First param: the authReducer and serviceReducer
//Second param: state
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
//Create a provider tag and assign the store instance to the react render function
//Provider is a react component used to update a new state every time a change occurs in the store
//In the App any state changes will be handled to store to the redux store
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.querySelector('#root')
);

console.log('STRIPE_KEY is ', process.env.REACT_APP_STRIPE_KEY);
console.log('Environment is ', process.env.NODE_ENV);
