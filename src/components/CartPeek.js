import React, { Component } from 'react'
import {
  loadCart,
  loadMainCart,
  peekCart,
} from '../store/actions/shoppingActions'
import { connect } from 'react-redux'
import filterPrice from '../utils/priceFilter'
import Plus from './svg/Plus'
import Minus from './svg/Minus'

class CartPeek extends Component {
  constructor(props) {
    super(props)
    this.totalPrice = this.totalPrice.bind(this)
    this.state = {
      cart: this.props.cart,
      currency: this.props.currency,
      total: '',
    }
  }

  totalPrice() {
    let prices = this.state.cart.map((item) =>
      parseFloat((item.quantity * filterPrice(item.prices)).toFixed(2)),
    )
    this.setState({ total: prices.reduce((total, price) => total + price, 0) })
  }
  increase(id) {
    this.setState(
      {
        cart: this.state.cart.map((item) => {
          if (item.id === id) {
            item.quantity += 1
          }
          return item
        }),
      },
      this.totalPrice(),
    )
  }
  reduce(id) {
    this.setState(
      {
        cart: this.state.cart.map((item) => {
          if (item.id === id) {
            item.quantity -= 1
          }
          return item
        }),
      },
      this.totalPrice(),
    )
  }

  componentDidMount() {
    this.props.loadCart()
    this.totalPrice()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currency != this.props.currency) {
      this.setState({ currency: this.props.currency }, () => this.totalPrice())
    }
  }

  render() {
    const { cart, currency } = this.state
    const { loadMainCart, peekCart } = this.props
    return (
      <div className="cart-peek">
        <div className="cart-peek__heading">
          {`My Bag: ${cart.length} items`}
        </div>
        <div className="cart-peek__items">
          {cart.map((cartItem, index) => (
            <div className="cart-peek__item" key={index}>
              <div className="cart-peek__desc">
                <p className="">{cartItem.name}</p>
                <p className="cart-peek__price">{`${currency} ${filterPrice(
                  cartItem.prices,
                )}`}</p>
                <div className="cart-peek__attributes">
                  {cartItem.attributes.map((attribute, index) => (
                    <div className="cart-peek__attribute" key={index}>
                      <p className="cart-peek__attribute--label">{`${attribute.name}:`}</p>
                      <div className="cart-peek__attribute--items">
                        {attribute.items.map((item, index) => (
                          <span
                            className={`cart-peek__attribute--item ${
                              cartItem.selectedOptions &&
                              cartItem.selectedOptions[attribute.name] ===
                                item.value
                                ? 'cart-peek__attribute--selected'
                                : ''
                            }`}
                            style={
                              attribute.type === 'swatch'
                                ? { backgroundColor: item.value }
                                : {}
                            }
                            data-attribute={attribute.name}
                            data-attributevalue={item.value}
                            onClick={(e) => this.addAttribute(e)}
                            key={index}
                          >
                            {attribute.type === 'text' ? item.value : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="cart-peek__controls">
                <Plus
                  className="cart-peek__control"
                  increase={() => this.increase(cartItem.id)}
                />
                <span>{cartItem.quantity}</span>
                <Minus
                  className="cart-peek__control"
                  decrease={() => this.reduce(cartItem.id)}
                />
              </div>
              <div className="cart-peek__image">
                <img src={cartItem.gallery[0]} alt="" />
              </div>
            </div>
          ))}
        </div>
        <div className="cart-peek__total">
          <span className="cart-peek__total--label">Total</span>
          <span className="cart-peek__total--value">
            {`${currency}${this.state.total.toLocaleString()}`}
          </span>
        </div>

        <div className="cart-peek__actions">
          <span
            className="cart-peek__actions--view"
            onClick={() => {
              peekCart()
              loadMainCart()
            }}
          >
            view bag
          </span>
          <span className="cart-peek__actions--checkout">checkout</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { cart, currency } = state.shop
  return {
    cart,
    currency,
  }
}

const mapDispatchToProps = {
  loadCart,
  loadMainCart,
  peekCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPeek)
