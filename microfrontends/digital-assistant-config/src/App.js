import React, {Component} from 'react';
import {Buffer} from "buffer";

class App extends Component {
  constructor(props) {
    super(props);
    /*
    let encoded;

    if (props.name != null && props.name !== '' ) {
      console.log("encoding", props);
      encoded = Buffer.from(props.name, 'utf-8').toString('base64');
      console.log("to", encoded);
    } else {
      console.log("using current value", props.name);
      encoded = props.name;
    }*/
    this.state = {
      name: props.name
    };
  }

  handleChange = e => {
    const input = e.target;
    const encoded = input.value;
    let decoded;


      decoded = Buffer.from(encoded, 'base64').toString('utf-8');
      if (encoded !== '' && Buffer.from(decoded, 'utf-8').toString('base64') === encoded) {
          // console.log('have valid configuration', decoded);
      } else {
        decoded = input.value;
      }

    this.setState({
      [input.name]: decoded,
    });
  };


  render() {
    const { name } = this.state;
    return (
        <div>
          <h1>Simple MFE Configuration</h1>
          <div>
            <label htmlFor="name">Name </label>
            <input id="name" name="name" defaultValue={name} type="text" onChange={this.handleChange}  />
          </div>
        </div>
    );
  }
}

export default App;
