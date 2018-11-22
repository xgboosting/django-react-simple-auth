import React, { Component } from 'react';
import { updateMessage, sendCreateAccount } from '../../actions';
import { Redirect } from 'react-router-dom';
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


class createAccount extends Component {

  constructor(props) {
    super(props);
    this.state = { emailValue: '', passwordValue: '', repeatPasswordValue: '' };
    this.emailChange = this.emailChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.repeatPasswordChange = this.repeatPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  emailChange(event) {
    this.setState({ emailValue: event.target.value });
  }

  repeatPasswordChange(event) {
    this.setState({ repeatPasswordValue: event.target.value });
  }

  passwordChange(event) {
    this.setState({ passwordValue: event.target.value });
  }


  handleSubmit(event) {
    console.log('here');
    event.preventDefault();
    if (this.state.repeatPasswordValue !== this.state.passwordValue) {
      this.props.updateMessage('passwords must match');
    } else if (this.state.repeatPasswordValue.length < 10) {
      this.props.updateMessage('password must be 10 characters');
    } else if (this.state.repeatPasswordValue === this.state.passwordValue && this.state.repeatPasswordValue.length > 9) {
      console.log(this.props.token);
      this.props.sendCreateAccount(this.state.emailValue, this.state.passwordValue, this.props.token)
    }
  }

  getRepeatState() {
    console.log(this.state)
    const length = this.state.repeatPasswordValue.length;
    if (length > 9 && this.state.passwordValue === this.state.repeatPasswordValue) return 'success';
    else if (length > 5) return 'error';
    else if (length > 0) return 'error';
    return null;
  }

  getState() {
    const length = this.state.passwordValue.length;
    if (length > 9) return 'success';
    else if (length > 5) return 'error';
    else if (length > 0) return 'error';
    return null;
  }


  render() {
    if (localStorage.getItem('token')) {
      return (
        <div>
          <Redirect to="/" />
        </div>
      )
    }
    return (
      <Panel style={{ marginLeft: '5%', marginRight: '5%' }}>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Create Account</Panel.Title>
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
            <FormGroup controlId="formHorizontalPassword" validationState={this.getState()}>
              <Col componentClass={ControlLabel} sm={2}>
                Password
    </Col>
              <Col sm={2}>
                <FormControl value={this.state.passwordValue} onChange={this.passwordChange} type="password" placeholder="password" />
              </Col>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem style={{ marginLeft: '5%', marginRight: '5%' }}>
            <FormGroup controlId="formHorizontalPassword1" validationState={this.getRepeatState()}>
              <Col componentClass={ControlLabel} sm={2}>
                Password
    </Col>
              <Col sm={2}>
                <FormControl value={this.state.repeatPasswordValue} onChange={this.repeatPasswordChange} type="password" placeholder="repeat password" />
              </Col>
            </FormGroup>
          </ListGroupItem>
          <HelpBlock>{this.props.message}</HelpBlock>
          <FormGroup>
            <Col smOffset={0} sm={10}>
              <Button bsStyle='primary' type="submit">Create account</Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>

    )
  }
}


const mapStateToProps = state => {
  console.log(state)
  return {
    message: state.message.message,
    token: state.auth.token
  };
};

export default connect(mapStateToProps, {
  updateMessage,
  sendCreateAccount
})(createAccount);
