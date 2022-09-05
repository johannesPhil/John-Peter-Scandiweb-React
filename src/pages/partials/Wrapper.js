import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import ProductDetails from '../../components/ProductDetails'
import TopBar from '../../components/TopBar'
import { connect } from 'react-redux'

class Wrapper extends Component {
  render() {
    const { message } = this.props
    return (
      <>
        <TopBar />
        <div className="wrapper">
          <Outlet />
        </div>
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { product } = state.shop
  return {
    product,
  }
}

export default connect(mapStateToProps)(Wrapper)
