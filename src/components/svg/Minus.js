import React, { Component } from 'react'

export default class Minus extends Component {
  render() {
    return (
      <div className={this.props.className} onClick={this.props.decrease}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
        >
          <path d="M0 10h24v4h-24z" />
        </svg>
      </div>
    )
  }
}
