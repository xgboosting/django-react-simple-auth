import React, { Component } from 'react';
import { updateMessage, LogOut } from '../../actions';
import { connect } from 'react-redux';
import {
  Button
} from 'react-bootstrap';


class logOut extends Component {


  constructor() {
    super();
    this.state = { show: false, secondshow: false };
  }

  render() {
    return (
      <div>
        <div style={logoutStyle}>
          <p>are you sure you want to logout?</p>
          <a href="/"><Button bsStyle='primary' onClick={() => this.props.LogOut()}>Log Out</Button></a>
        </div>
        <div>
        </div>
      </div>
    )
  }
}


const logoutStyle = {
  flex: 1,
  justifyContent: 'flex-start',
};

const mapStateToProps = state => {
  return {
    message: state.message.message,
  };
};

export default connect(mapStateToProps, {
  updateMessage,
  LogOut
})(logOut);
