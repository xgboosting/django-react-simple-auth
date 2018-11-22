import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { updateMessage, loginUser } from '../../actions';
import { connect } from 'react-redux';
import {
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Button,
  HelpBlock,
  Panel,
  ListGroupItem
} from 'react-bootstrap';


class login extends Component {

  constructor(props) {
    super(props);
    this.state = { emailValue: '', passwordValue: '' };
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  emailChange(event) {
    this.setState({ emailValue: event.target.value });
  }

  passwordChange(event) {
    this.setState({ passwordValue: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.loginUser(this.state.emailValue, this.state.passwordValue, this.props.token);
  }

  render() {
    if (this.props.loginMessage === 'you are now logged in') {
      return (
        <div>
          <Redirect to="/" />
        </div>
      )
    }
    return (
      <div>
        <Panel style={{ marginLeft: '5%', marginRight: '5%' }}>
          <Panel.Heading>
            <Panel.Title componentClass="h3">Login</Panel.Title>
          </Panel.Heading>
          <br />
          <Form horizontal onSubmit={this.handleSubmit}>
            <ListGroupItem style={{ marginLeft: '5%', marginRight: '5%' }}>
              <FormGroup controlId="formHorizontalEmail">
                <Col componentClass={ControlLabel} sm={2}>
                  Email
    </Col>
                <Col sm={4}>
                  <FormControl value={this.state.emailValue} onChange={this.emailChange} type="email" placeholder="Email" />
                </Col>
              </FormGroup>
            </ListGroupItem>
            <ListGroupItem style={{ marginLeft: '5%', marginRight: '5%' }}>
              <FormGroup controlId="formHorizontalPassword">
                <Col componentClass={ControlLabel} sm={2}>
                  Password
    </Col>
                <Col sm={2}>
                  <FormControl value={this.state.passwordValue} onChange={this.passwordChange} type="password" placeholder="Password" />
                </Col>
              </FormGroup>
            </ListGroupItem>
            <HelpBlock>{this.props.loginMessage}</HelpBlock>
            <FormGroup>
              <Col smOffset={0} sm={10}>
                <Button bsStyle='primary' type="submit">login</Button>

              </Col>
              <Col smOffset={0} sm={10}>
                <a href='/password-recover'>forgot your password?</a>
              </Col>
            </FormGroup>
          </Form>
        </Panel>
      </div>
    )
  }
}


const mapStateToProps = state => {
  console.log(state)
  return {
    loginMessage: state.message.loginMessage,
    token: state.auth.token
  };
};

export default connect(mapStateToProps, {
  updateMessage,
  loginUser
})(login);
