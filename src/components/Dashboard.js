import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Dashboard extends Component {
  async componentDidMount() {
    this.props.getSecret()
  }
  render() {
    return (
      <div>
        Dashboard Secret: <h3>{this.props.secret}</h3>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    secret: state.dashboard.secret,
  }
}
export default connect(mapStateToProps, actions)(Dashboard)
