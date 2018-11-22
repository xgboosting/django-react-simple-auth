import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Panel,
  Row,
  Grid,
} from 'react-bootstrap';
// Import FilePond styles
import 'filepond/dist/filepond.min.css';



const divStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center'
};

const formStyle = {
  borderRadius: 4,
  borderWidth: 0.5,
  borderColor: 'black',
  fontSize: '120%',
}


class Landing extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.token);
    this.state = {
      description: '',
      sampleTitle: "choose a sample dataset"
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let file = this.pond.getFiles();
    let formData = new FormData();
    file = file[0]
    formData.append('file', file.file)
    formData.append('description', this.state.description);
    formData.append('fileType', file.fileType);
    this.props.uploadCSV(formData, this.props.token);
  }

  render() {
    return (
      <Panel style={{ margin: '5%', padding: '5%' }}>
      <Grid>
      <Row>

        </Row>
        </Grid>
      </Panel>
    )
  }
}

/*Hello.propTypes = {
 onClick: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired

}*/
const mapStateToProps = state => {
  console.log(state)
  return {
    message: state.message.message,
    token: state.auth.token
  };
};

export default connect(mapStateToProps, {})(Landing);
