import React, {Component} from 'react';
import {Buffer} from "buffer";

class App extends Component {
  constructor(props) {
    super(props);
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

  toBase64 = value => {
    if ((value) && value !== '') {
      let encoded = Buffer.from(value, 'utf-8').toString('base64');

      console.log('presento stringa codificata ' + encoded);
      return encoded;
    }
    return value;
  }

  render() {
    const { name } = this.state;
    return (
        <div>
          <h1>Simple MFE Configuration</h1>
          <div>
            <label htmlFor="name">Name </label>
            <input id="name" name="name" defaultValue={this.toBase64(name)} type="text" onChange={this.handleChange}  />
          </div>
        </div>
    );
  }
}

export default App;
