import React, { Component } from 'react';
import Home from './components/Home';
import { 
  getInitialState, 
  deleteGuest
} from './actions';
import { connect } from 'react-redux';


class App extends Component {
    constructor(props) {
      super(props);
      if (this.props.token === "") {
        console.log('getting guest user')
        this.props.getInitialState();
      }
    }

    componentWillUnmount() {
      if (this.props.guest) {
        console.log('delete guest')
        this.props.deleteGuest(this.props.token);
      }
    }


  render() {
    return (
    <div>
       <Home />
    </div>
    );
  }
}

const mapStateToProps = state => {
  console.log(state)
return {
  message: state.auth.message,
  token: state.auth.token,
  guest: state.auth.guest
 };
};

export default connect(mapStateToProps, {
  getInitialState,
  deleteGuest
})(App);
