import React, { Component } from 'react'
import { connect } from 'react-redux'

export default (OriginalComponent) => {
  class MixedComponent extends Component {
    componentDidMount() {
      this.checkAuth()
    }
    componentDidUpdate() {
      this.checkAuth()
    }
    render() {
      return <OriginalComponent {...this.props} />
    }

    checkAuth() {
      if (!this.props.isAuth && !this.props.token) {
        this.props.history.push('/')
      }
    }
  }

  function mapStatesToProps(state) {
    return {
      isAuth: state.auth.isAuthenticated,
      token: state.auth.token,
    }
  }

  return connect(mapStatesToProps)(MixedComponent)
}
