import React, { useEffect, useState } from 'react'

const App = (props) => {
  const [name, setName] = useState(props.name)
  const [invalid, setInvalid] = useState(false)

  console.log('init', props.name)

  useEffect(() => {
    if (props.name) {
      console.log('useEffect', props.name)
      setName(props.name)
    }
  }, [props.name])

  const toBase64 = (value) => {
    if (value && value !== '') {
      let encoded = Buffer.from(value, 'utf-8').toString('base64')

      //console.log('presento stringa codificata ' + encoded);
      return encoded
    }
    return value
  }

  const handleChange = (e) => {
    const input = e.target
    const encoded = input.value
    const save = Array.from(document.getElementsByClassName('save'))
    let saveButton = save[0]
    let decoded

    decoded = Buffer.from(encoded, 'base64').toString('utf-8')
    if (
      encoded !== '' &&
      Buffer.from(decoded, 'utf-8').toString('base64') === encoded
    ) {
      setInvalid(false)
      saveButton.removeAttribute('disabled')
      saveButton.style.pointerEvents = 'unset'
    } else {
      // invalid input
      decoded = input.value
      setInvalid(true)
      saveButton.setAttribute('disabled')
      saveButton.style.pointerEvents = 'none'
    }
    // this.setState({
    //   [input.name]: decoded,
    // })
    setName(decoded)
  }

  return (
    <div className='PageConfigPage__panel-body panel-body'>
      <div className='digital-assistant'>
        <h5>
          <span className='icon fa fa-puzzle-piece' title='Widget'></span>
          <span> Digital Assistant MFE</span>
        </h5>
        <form className='form-horizontal'>
          <div className='row'>
            <div className='col-xs-12'>
              <fieldset className='no-padding'>
                <legend role='heading' aria-level='1'>
                  <span>Base64 url setting </span>
                </legend>
                <div className='no-padding col-lg-12 col-md-12'>
                  <div className='form-group'>
                    <div className='text-right mobile-left col-sm-2 col-xs-12'>
                      <label htmlFor='name' className='control-label'>
                        <span className='FormLabel'>
                          <span>Insert valid Base64 code</span>
                        </span>
                      </label>
                    </div>
                    <div className='col-sm-10 col-xs-12'>
                      <input
                        className='form-control'
                        id='name'
                        name='name'
                        defaultValue={() => toBase64(name)}
                        type='text'
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div
                  className={`labelerror no-padding col-lg-12 ${
                    invalid ? 'error' : 'hidden'
                  }`}
                >
                  <div className='alert alert alert-danger'>
                    <span
                      aria-hidden='true'
                      className='pficon pficon-error-circle-o'
                    ></span>
                    <span>
                      <strong>Insert a valid activation code</strong>
                    </span>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
          <div className='row'>
            <div className='col-xs-12'></div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
