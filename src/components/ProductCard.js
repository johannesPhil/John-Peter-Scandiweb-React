import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getProduct, addToCart } from '../store/actions/shoppingActions'
import cart from '../assets/images/cart-white.svg'
import filterPrice from '../utils/priceFilter'

class ProductCard extends Component {
  constructor(props) {
    super(props)
    this.addToBasket = this.addToBasket.bind(this)
    this.showItem = this.showItem.bind(this)
  }

  addToBasket = (id) => {
    let product = this.props.category.products.filter(
      (product) => product.id === id,
    )
    this.props.addToCart(product[0])
  }
  showItem(event, id) {
    this.props.getProduct(id)
    this.props.toggleView()
  }

  render() {
    const { currencies, currency, product } = this.props
    return (
      <div
        className={`product ${!product.inStock ? 'product__out-of-stock' : ''}`}
      >
        <div className="product__picture">
          <img src={product.gallery[0]} alt="" className="product__img" />
          {product.inStock && (
            <div
              className="product__cart"
              onClick={() => this.addToBasket(product.id)}
            >
              <img src={cart} alt="" className="" />
            </div>
          )}
        </div>
        <div
          className="product__summary"
          onClick={(e) => this.showItem(e, product.id)}
        >
          <p className="product__name">{product.name}</p>
          <p className="product__price">{`${currency}${filterPrice(
            product.prices,
          )}`}</p>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { currency, currencies, category } = state.shop
  return {
    currency,
    currencies,
    category,
  }
}

const mapDispatchToProps = { getProduct, addToCart, filterPrice }
export default connect(mapStateToProps, mapDispatchToProps)(ProductCard)
