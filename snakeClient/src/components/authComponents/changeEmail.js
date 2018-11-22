import React, { Component } from 'react';
import { sendChangeEmail } from '../../actions';
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


class changeEmail extends Component {

  constructor(props) {
    super(props);
    this.state = { passwordValue: '', newEmailValue: '' };
    this.passwordChange = this.passwordChange.bind(this);
    this.newEmailChange = this.newEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }



  newEmailChange(event) {
    this.setState({ newEmailValue: event.target.value });
  }

  passwordChange(event) {
    this.setState({ passwordValue: event.target.value });
  }


  handleSubmit(event) {
    event.preventDefault();
    this.props.sendChangeEmail(this.state.passwordValue, this.state.newEmailValue, this.props.token);
  }



  render() {
    return (
      <Panel style={{ marginLeft: '5%', marginRight: '5%' }}>
        <Panel.Heading>
          <Panel.Title componentClass="h3">Change Email</Panel.Title>
        </Panel.Heading>
        <br />
        <Form horizontal onSubmit={this.handleSubmit}>
          <ListGroupItem style={{ marginLeft: '5%', marginRight: '5%' }}>
            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
    </Col>
              <Col sm={2}>
                <FormControl value={this.state.passwordValue} onChange={this.passwordChange} type="password" placeholder="password" />
              </Col>
            </FormGroup>
          </ListGroupItem>
          <ListGroupItem style={{ marginLeft: '5%', marginRight: '5%' }}>
            <FormGroup controlId="formHorizontalEmail">
              <Col componentClass={ControlLabel} sm={2}>
                New Email
    </Col>
              <Col sm={4}>
                <FormControl value={this.state.newEmailValue} onChange={this.newEmailChange} type="email" placeholder="Email@example.com" />
              </Col>
            </FormGroup>
          </ListGroupItem>

          <HelpBlock>{this.props.changeMessage}</HelpBlock>
          <FormGroup>
            <Col smOffset={0} sm={10}>
              <Button bsStyle='primary' type="submit">Change Email</Button>
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
  sendChangeEmail
})(changeEmail);
