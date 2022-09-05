import React, { Component } from 'react'
import { loadCart, mainCart } from '../store/actions/shoppingActions'
import { connect } from 'react-redux'
import filterPrice from '../utils/priceFilter'
import Plus from './svg/Plus'
import Minus from './svg/Minus'
import Close from './Close'
import { closeMainCart } from '../store/actions/shoppingActions'

class Cart extends Component {
  constructor(props) {
    super(props)
    this.taxRate = 21
    this.sum = this.sum.bind(this)
    this.increase = this.increase.bind(this)
    this.reduce = this.reduce.bind(this)
    this.state = {
      cart: this.props.cart,
      currency: this.props.currency,
      tax: '',
      subTotal: '',
      total: '',
    }
  }

  sum() {
    let prices = this.state.cart.map((item) =>
      parseFloat((item.quantity * filterPrice(item.prices)).toFixed(2)),
    )
    this.setState({
      subTotal: prices.reduce((total, price) => total + price, 0),
      tax: parseFloat((this.taxRate / 100) * this.state.subTotal).toFixed(2),
      total: this.state.subTotal + this.state.tax,
    })
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
      this.sum(),
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
      this.sum(),
    )
  }

  componentDidMount() {
    this.props.loadCart()
    this.sum()
  }

  componentDidUpdate(prevState, prevProps) {
    if (prevProps.currency != this.props.currency) {
      this.setState({ currency: this.props.currency }, () => this.sum())
    }
  }

  render() {
    const { cart, currency } = this.state
    return (
      <div className="cart cart__show">
        <Close
          color="#cecece"
          className="item__hide"
          close={this.props.closeMainCart}
        />
        <div className="cart__heading">cart</div>
        <div className="cart__items">
          {cart.map((cartItem, index) => (
            <div className="cart__item" key={index}>
              <div className="cart__desc">
                <p className="cart__name">{cartItem?.name}</p>
                <p className="cart__price">{`${currency} ${filterPrice(
                  cartItem.prices,
                )}`}</p>
                <div className="cart__attributes">
                  {cartItem.attributes.map((attribute, index) => (
                    <div className="cart__attribute" key={index}>
                      <p className="cart__attribute--label">{`${attribute.name}:`}</p>
                      <div className="cart__attribute--items">
                        {attribute.items.map((item, index) => (
                          <span
                            className={`cart__attribute--item ${
                              cartItem.selectedOptions &&
                              cartItem.selectedOptions[attribute.name] ===
                                item.value
                                ? 'cart__attribute--selected'
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
              <div className="cart__controls">
                <Plus
                  className="cart__control"
                  increase={() => this.increase(cartItem.id)}
                />
                <span>{cartItem.quantity}</span>
                <Minus
                  className="cart__control"
                  decrease={() => this.reduce(cartItem.id)}
                />
              </div>
              <div className="cart__image">
                <img src={cartItem.gallery[0]} alt="" />
                {/* <div className="cart__image--controls">
                  <span className="cart__image--control">&#x276E;</span>
                  <span className="cart__image--control">&#x276F;</span>
                </div> */}
              </div>
            </div>
          ))}
        </div>
        <div className="cart__amount">
          <div className="">
            <span className="cart__amount--label">Tax (21%):</span>
            <span className="cart__amount--value">
              {`${currency}${this.state.tax}`}
            </span>
          </div>
          <div>
            <span className="cart__amount--label">Total Amount:</span>
            <span className="cart__amount--value">
              {`${currency}${parseFloat(this.state.total).toFixed(2)}`}
            </span>
          </div>
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
  closeMainCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
