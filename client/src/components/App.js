//using bable import here
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux'; // compatibility between react and redux
import * as actions from '../actions'; //import all action creators
//We can use react components inside tags to render content
//BrowseRouter expects at most one child, we can not use two or more div tags inside the tag
//Create a dummy component. Later changed to real routers
import Header from './Header';
import Landing from './Landing';
//const Header = () => <h2>Header</h2> - change this dummy header with real header
const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>
//const Landing = () => <h2>Landing</h2> //dummy component
//exact === exact={ true }
//change it to react component to fetch action creators
//App component
class App extends Component {
  componentDidMount() {
    this.props.fetchUser(); // actual action creator function called here
  }
  //React router is done here
  render() {
  return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact= { true } path="/" component = { Landing }/>
            <Route exact path="/surveys" component = { Dashboard } />
            <Route path="/surveys/new" component = { SurveyNew } />
          </div>
        </BrowserRouter>
      </div>
  );
 }
};
//actions are stored in App props
export default connect(null, actions)(App); // first param is state and second is action creators
