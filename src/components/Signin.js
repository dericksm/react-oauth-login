import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { compose } from 'redux'
import GoogleLogin from 'react-google-login'

import CustomInput from './CustomInput'

import * as actions from '../actions'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.responseGoogle = this.responseGoogle.bind(this)
  }

  async onSubmit(formData) {
    console.log(formData)
    await this.props.signIn(formData)
  }

  async responseGoogle(res) {
    await this.props.googleOauth(res.accessToken)
  }

  responseFacebook(res) {}

  render() {
    const { handleSubmit } = this.props
    return (
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <fieldset>
              <Field
                name="email"
                type="text"
                id="email"
                component={CustomInput}
                label="Enter your email"
                placeholder="loremipsum@gmail.com"
              />
            </fieldset>
            <fieldset>
              <Field
                name="password"
                type="text"
                id="password"
                component={CustomInput}
                label="Enter your password"
              />
            </fieldset>

            {this.props.errorMessage ? (
              <div className="alert alert-danger"> {this.props.errorMessage} </div>
            ) : null}

            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>
        </div>
        <div className="col">
          <div className="text-center">
            <div className="alert alert-primary">Or sign in using third party services</div>
            <GoogleLogin
              clientId="242425157468-0as7hk6b6kec363v0u4543c5jk6iqobs.apps.googleusercontent.com"
              button="Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              className="btn btn-outline-dangera"
            />
            {/* <FacebookLogin
              appId="1000524060366432"
              autoLoad="true"
              textButton="Facebook"
              fields="name, email"
              callback={this.responseFacebook}
              cssClass="btn btn-outline-primary"
            /> */}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage,
  }
}

export default compose(connect(mapStateToProps, actions), reduxForm({ form: 'signin' }))(Signin)
