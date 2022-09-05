import './styles/main.scss'
import React, { Component } from 'react'
import TopBar from './components/TopBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AllCategories from './pages/AllCategories'
import ClotheCategory from './pages/ClotheCategory'
import TechCategory from './pages/TechCategory'
import Wrapper from './pages/partials/Wrapper'
import { connect } from 'react-redux'
import CartPeek from './components/CartPeek'
import Index from './components/Index'

class App extends Component {
  render() {
    const { overlay, miniCart } = this.props
    return (
      <div className="app">
        {overlay && <div className="overlay">{miniCart && <CartPeek />}</div>}
        <Routes>
          <Route path="/">
            <Route path="" element={<Index />} />
            <Route path="categories" element={<Wrapper />}>
              <Route path="all" index={true} element={<AllCategories />} />
              <Route path="clothes" element={<ClotheCategory />} />
              <Route path="tech" element={<TechCategory />} />
            </Route>
          </Route>
        </Routes>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  const { overlay, miniCart } = state.shop
  return {
    overlay,
    miniCart,
  }
}

export default connect(mapStateToProps)(App)
