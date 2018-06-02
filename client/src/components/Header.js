import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
  //Using render content show Sign in only when the user is logged in
  //When array used in a return statement a unique key has to be set on the prop
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return <li><a href="/auth/google">Login With Google</a></li>;
      default:
        return [
          <li key="1"><Payments /></li>,
          <li key="3" style={{ margin:'0 10px' }}>
            Credits: {this.props.auth.credits}
          </li>,
          <li key="2"><a href="/api/logout">Logout</a></li>
        ];
    }
  }

  render() {
    //console.log(this.props);
    return (
      <nav>
        <div className="nav-wrapper">
          <Link
            to= { this.props.auth ? '/surveys' : '/' }
            className="left brand-logo"
          >
            Emaily
          </Link>
          <ul className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}
//To connect to the header we create a function that gets the auth from index JS reducer
function mapStateToProps({ auth }) {
  return { auth };  //auth: state.auth - can be used
}
// Export the Header default
export default connect(mapStateToProps)(Header);
