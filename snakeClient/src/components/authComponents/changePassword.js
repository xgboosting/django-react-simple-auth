import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
  updateMessage,
  loginUser,
  sendChangePassword,
  updateChangeMessage
} from '../../actions';
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


class changePassword extends Component {

  constructor(props) {
    super(props);
    this.state = { passwordValue: '', newPasswordValue: '', newRepeatPasswordValue: '' };
    this.passwordChange = this.passwordChange.bind(this);
    this.newPasswordChange = this.newPasswordChange.bind(this);
    this.newRepeatPasswordChange = this.newRepeatPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  passwordChange(event) {
    this.setState({ passwordValue: event.target.value });
  }

  newRepeatPasswordChange(event) {
    this.setState({ newRepeatPasswordValue: event.target.value });
  }

  newPasswordChange(event) {
    this.setState({ newPasswordValue: event.target.value });
  }


  handleSubmit(event) {
    console.log('here');
    event.preventDefault();
    if (this.state.newRepeatPasswordValue !== this.state.newPasswordValue) {
      this.props.updateChangeMessage('passwords must match');
    } else if (this.state.newRepeatPasswordValue.length < 10) {
      this.props.updateChangeMessage('password must be 10 characters');
    } else if (this.state.newRepeatPasswordValue === this.state.newPasswordValue && this.state.newRepeatPasswordValue.length > 9) {
      this.props.sendChangePassword(this.state.passwordValue, this.state.newPasswordValue, this.props.token);
    }
  }

  getRepeatState() {
    console.log(this.state)
    const length = this.state.newRepeatPasswordValue.length;
    if (length > 9 && this.state.newPasswordValue === this.state.newRepeatPasswordValue) return 'success';
    else if (length > 5) return 'error';
    else if (length > 0) return 'error';
    return null;
  }

  getState() {
    const length = this.state.newPasswordValue.length;
    if (length > 9) return 'success';
    else if (length > 5) return 'error';
    else if (length > 0) return 'error';
    return null;
  }


  render() {
    if (this.props.changeMessage === 'password changed') {
      return (
        <div>
          <Redirect to="/" />
        </div>
      )
    }
    return (
      <Panel style={{ marginLeft: '5%', marginRight: '5%' }}>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Change Password</Panel.Title>
        </Panel.Heading>
        <br />
        <Form horizontal onSubmit={this.handleSubmit}>
          <ListGroupItem style={{ marginLeft: '5%', marginRight: '5%' }}>
            <FormGroup controlId="formHorizontalPassword" >
              <Col componentClass={ControlLabel} sm={2}>
                Password
    </Col>
              <Col sm={3}>
                <FormControl value={this.state.passwordValue} onChange={this.passwordChange} type="password" placeholder="password" />
              </Col>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem style={{ marginLeft: '5%', marginRight: '5%' }}>
            <FormGroup controlId="formHorizontalPassword" validationState={this.getState()}>
              <Col componentClass={ControlLabel} sm={2}>
                New Password
     </Col>
              <Col sm={3}>
                <FormControl value={this.state.newPasswordValue} onChange={this.newPasswordChange} type="password" placeholder=" new password" />
              </Col>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem style={{ marginLeft: '5%', marginRight: '5%' }}>
            <FormGroup controlId="formHorizontalPassword1" validationState={this.getRepeatState()}>
              <Col componentClass={ControlLabel} sm={2}>
                Repeat Password
     </Col>
              <Col sm={3}>
                <FormControl value={this.state.newRepeatPasswordValue} onChange={this.newRepeatPasswordChange} type="password" placeholder="repeat new password" />
              </Col>
            </FormGroup>
          </ListGroupItem>
          <HelpBlock>{this.props.changeMessage}</HelpBlock>
          <FormGroup>
            <Col smOffset={0} sm={10}>
              <Button bsStyle='primary' type="submit">Change password</Button>
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
    changeMessage: state.message.changeMessage,
    token: state.auth.token
  };
};

export default connect(mapStateToProps, {
  updateMessage,
  loginUser,
  sendChangePassword,
  updateChangeMessage
})(changePassword);
