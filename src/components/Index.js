import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class Index extends Component {
  render() {
    return (
      <div className="index">
        <NavLink to="/categories/all">Go to Categories</NavLink>
      </div>
    )
  }
}
