import React, { Component } from 'react'
import ProductCard from './ProductCard'
import { connect } from 'react-redux'
import Price from '../utils/priceFilter'
import filterPrice from '../utils/priceFilter'
import ProductDetails from './ProductDetails'
import Cart from './Cart'

class ItemDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      displayItem: false,
    }
    this.toggleView = this.toggleView.bind(this)
  }

  toggleView() {
    this.setState((currValue) => ({ displayItem: !currValue.displayItem }))
  }

  render() {
    const status = this.state.displayItem
    const { category, loading, message, mainCart } = this.props

    return (
      <div className="display">
        {message && <div className="toast">{message}</div>}
        <div
          className={`category ${
            !this.state.displayItem ? 'category__show' : ''
          }`}
        >
          <h1 className="category__title">{category.name}</h1>
          {loading ? (
            <div className="category__placeholder"></div>
          ) : (
            <div className="category__products">
              {category.products?.map((product) => (
                <ProductCard
                  product={product}
                  toggleView={this.toggleView}
                  key={product.id}
                />
              ))}
            </div>
          )}
        </div>
        {status && (
          <ProductDetails status={status} toggleView={this.toggleView} />
        )}
        {mainCart && <Cart />}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    category,
    currency,
    currencies,
    loading,
    message,
    mainCart,
  } = state.shop
  return {
    category,
    currencies,
    currency,
    loading,
    message,
    mainCart,
  }
}

export default connect(mapStateToProps)(ItemDisplay)
