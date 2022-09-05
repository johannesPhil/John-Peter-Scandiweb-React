import React, { Component } from 'react'

export default class Close extends Component {
  render() {
    return (
      <span className={this.props.className} onClick={() => this.props.close()}>
        <svg
          viewport="0 0 12 12"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line
            x1="1"
            y1="22"
            x2="22"
            y2="1"
            stroke={this.props.color}
            strokeWidth="5"
          />
          <line
            x1="1"
            y1="1"
            x2="22"
            y2="22"
            stroke={this.props.color}
            strokeWidth="5"
          />
        </svg>
      </span>
    )
  }
}
