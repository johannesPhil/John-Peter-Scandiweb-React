import React, { Component } from 'react'

export default class Plus extends Component {
  render() {
    return (
      <div className={this.props.className} onClick={this.props.increase}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 24 24"
        >
          <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
        </svg>
      </div>
    )
  }
}
