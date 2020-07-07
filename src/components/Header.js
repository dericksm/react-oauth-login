import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Header extends Component {
  constructor(props) {
    super(props)
    this.signOut = this.signOut.bind(this)
  }

  signOut() {
    this.props.signOut()
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" style={{ marginBottom: '2%' }}>
        <Link to="/" className="navbar-brand">
          Node OAuth - React
        </Link>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
          </ul>

          <ul className="nav navbar-nav ml-auto">
            {!this.props.isAuth
              ? [
                  <li className="nav-item" key="signup">
                    <Link to="/signup" className="nav-link">
                      Sign up
                    </Link>
                  </li>,
                  <li className="nav-item" key="signin">
                    <Link to="/signin" className="nav-link">
                      Sign in
                    </Link>
                  </li>,
                ]
              : null}
            {this.props.isAuth ? (
              <li className="nav-item">
                <Link to="/signout" onClick={this.signOut} className="nav-link">
                  Sign out
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
    )
  }
}

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated,
  }
}

export default connect(mapStateToProps, actions)(Header)
