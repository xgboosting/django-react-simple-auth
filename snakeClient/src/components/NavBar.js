import React, { Component } from 'react';
import FAQ from './FAQ';
import login from './authComponents/login';
import Landing from './Landing';
import logOut from './authComponents/logOut';
import createAccount from './authComponents/createAccount';
import passwordRecover from './authComponents/passwordRecover';
import changePassword from './authComponents/changePassword';
import changeEmail from './authComponents/changeEmail';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { updateMessage } from '../actions';
import { connect } from 'react-redux';
import {
  Switch,
  Route
} from 'react-router-dom';


const divStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
};

let SITE_NAME = 'example.com'

//const isMobile = window.innerWidth <= 500;

class NavBar extends Component {


  constructor(props) {
    super(props);
  }


  render() {
    if (this.props.guest === false) {
      return (
        <div style={divStyle} >
          <Navbar>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">{SITE_NAME}</a>
              </Navbar.Brand>
            </Navbar.Header>
            <Nav>
              <NavItem eventKey={3} href="/faq">
                FAQ
        </NavItem>
              <NavDropdown eventKey={3.1} title="Settings" id="basic-nav-dropdown">
                <MenuItem href="/faq" eventKey={3.5}>FAQ</MenuItem>
                <MenuItem href="/change-password" eventKey={3.6}>change password</MenuItem>
                <MenuItem href="/change-email" eventKey={3.7}>change email</MenuItem>
                <MenuItem href="/logOut" eventKey={3.2}>logout</MenuItem>
              </NavDropdown>
              <NavDropdown eventKey={3.1} title="Orders" id="basic-nav-dropdown">
                <MenuItem href="/" eventKey={3.5}>new order</MenuItem>
              </NavDropdown>
            </Nav>
          </Navbar>
          <div>
            <Switch>
              <Route path="/faq" component={FAQ} />
              <Route path="/logOut" component={logOut} />
              <Route path="/change-password" component={changePassword} />
              <Route path="/change-email" component={changeEmail} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </div>

      )
    }
    return (
      <div style={divStyle} >
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">{SITE_NAME}</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/createAccount">
              create account
      </NavItem>
            <NavItem eventKey={2} href="/login">
              login
      </NavItem>
            <NavItem eventKey={3} href="/faq">
              FAQ
      </NavItem>
          </Nav>
        </Navbar>
        <div>
          <Switch>
            <Route path="/faq" component={FAQ} />
            <Route path="/login" component={login} />
            <Route path="/createAccount" component={createAccount} />
            <Route path="/password-recover" component={passwordRecover} />
            <Route path="/" component={Landing} />
          </Switch>
        </div>
      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    message: state.message.message,
    token: state.auth.token,
    guest: state.auth.guest
  };
};

export default connect(mapStateToProps, {
  updateMessage
})(NavBar);
