import React, {Component} from 'react';
import {Buffer} from "buffer";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      invalid: false
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      name: props.name,
    })
  }

  handleChange = e => {
    const input = e.target;
    const encoded = input.value;
    const save = Array.from(
        document.getElementsByClassName('save')
    );
    let saveButton = save[0];
    let decoded;

    decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    if (encoded !== '' && Buffer.from(decoded, 'utf-8').toString('base64') === encoded) {
      this.setState({invalid: false});
      saveButton.removeAttribute('disabled');
      saveButton.style.pointerEvents = "unset";
    } else {
      // invalid input
      decoded = input.value;
      this.setState({invalid: true});
      saveButton.setAttribute('disabled','');
      saveButton.style.pointerEvents = "none";
    }
    this.setState({
      [input.name]: decoded,
    });
  };

  toBase64 = value => {
    if ((value) && value !== '') {
      let encoded = Buffer.from(value, 'utf-8').toString('base64');
      return encoded;
    }
    return value;
  }

  render() {
    const { name } = this.state;
    let invalidBool = this.state.invalid;
    let invalidOutBool = (invalidBool === "true" || invalidBool === true);

    return (
        <div className="PageConfigPage__panel-body panel-body">
          <div className="digital-assistant">
            <h5>
              <span className="icon fa fa-puzzle-piece" title="Widget"></span>
              <span> Digital Assistant MFE</span>
            </h5>
            <form className="form-horizontal">
              <div className="row">
                <div className="col-xs-12">
                  <fieldset className="no-padding">
                    <legend role="heading" aria-level="1">
                      <span>Base64 url setting </span>
                    </legend>
                    <div className="no-padding col-lg-12 col-md-12">

                      <div className="form-group">
                        <div className="text-right mobile-left col-sm-2 col-xs-12">
                          <label htmlFor="name" className="control-label">
                            <span className="FormLabel">
                              <span>Insert valid Base64 code</span>
                            </span>
                          </label>
                        </div>
                        <div className="col-sm-10 col-xs-12">
                          <input className="form-control"  id="name" name="name" defaultValue={this.toBase64(name)} type="text" onChange={
                            this.handleChange}  />
                        </div>
                      </div>
                    </div>

                    <div className={`labelerror no-padding col-lg-12 ${ invalidOutBool ? 'error' : 'hidden' }`}>
                      <div className="alert alert alert-danger">
                        <span aria-hidden="true" className="pficon pficon-error-circle-o"></span>
                        <span><strong>Insert a valid activation code</strong></span>
                      </div>
                    </div>

                  </fieldset>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12"></div>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

export default App;
