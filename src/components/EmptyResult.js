import React, { Component } from 'react'

export default class EmptyResult extends Component {
  render() {
    return <p className="empty">{this.props.text}</p>
  }
}
