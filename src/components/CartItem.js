import React, { Component } from 'react'
import filterPrice from '../utils/priceFilter'
import Plus from './svg/Plus'
import Minus from './svg/Minus'
import { connect } from 'react-redux'

class CartItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartItem: this.props.cartItem,
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cartItem.quantity != this.props.cartItem.quantity) {
      this.setState({
        ...this.state.cartItem,
        ['quantity']: this.props.cartItem.quantity,
      })
    }
  }

  render() {
    const { currency, increase, reduce, cartItem } = this.props
    // const { cartItem } = this.state

    return (
      <div className="cart__item">
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
                        cartItem.selectedOptions[attribute.name] === item.value
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
            increase={() => increase(cartItem.id)}
          />
          <span>{cartItem.quantity}</span>
          <Minus
            className="cart__control"
            decrease={() => reduce(cartItem.id)}
          />
        </div>
        <div className="cart__image">
          <img src={cartItem.gallery[0]} alt="" />
          <div className="cart__image--controls">
            <span className="cart__image--control">&#x276E;</span>
            <span className="cart__image--control">&#x276F;</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { currency } = state.shop
  return {
    currency,
  }
}

export default connect(mapStateToProps)(CartItem)
