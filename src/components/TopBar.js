import React, { Component } from 'react'
import cartBlack from '../assets/images/cart-black.svg'
import chevronDown from '../assets/images/chevron-down.svg'
import logo from '../assets/images/logo.svg'
import { NavLink } from 'react-router-dom'
import withRouter from 'react-router-dom'

import { connect } from 'react-redux'
import {
  getCurrencies,
  setCurrency,
  getCategory,
  loadCart,
  peekCart,
} from '../store/actions/shoppingActions'

class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCurrencies: false,
    }
  }

  componentDidMount() {
    this.props.getCurrencies()
    this.props.loadCart()
    this.props.getCategory(window.location.pathname.split('/')[2])
  }
  render() {
    const { currencies, currency, cart, peekCart } = this.props
    return (
      <nav className="navigation">
        <div className="navigation__categories">
          <NavLink
            to="/categories/all"
            className={({ isActive }) =>
              isActive
                ? 'navigation__link navigation__link--active'
                : ' navigation__link'
            }
          >
            All
          </NavLink>
          <NavLink
            to="/categories/clothes"
            className={({ isActive }) =>
              isActive
                ? 'navigation__link navigation__link--active'
                : 'navigation__link navigation__link'
            }
          >
            Clothes
          </NavLink>
          <NavLink
            to="/categories/tech"
            className={({ isActive }) =>
              isActive
                ? 'navigation__link navigation__link--active'
                : 'navigation__link navigation__link'
            }
          >
            Tech
          </NavLink>
        </div>
        <div className="navigation__logo">
          <img src={logo} alt="" />
        </div>
        <div className="navigation__purchase">
          <div
            className="currency"
            onMouseEnter={() => this.setState({ showCurrencies: true })}
            onMouseLeave={() => this.setState({ showCurrencies: false })}
          >
            <div className="currency__selected">
              {currency ? currency : currencies[0]?.symbol}
            </div>
            <div
              className={`currency__options ${
                this.state.showCurrencies ? 'currency__options--visible' : ''
              }`}
            >
              {currencies.length > 0 &&
                currencies.map((currency, index) => (
                  <span
                    className="currency__option"
                    key={index}
                    onClick={() => this.props.setCurrency(currency.symbol)}
                  >{`${currency.symbol} ${currency.label} `}</span>
                ))}
            </div>
            <span
              className={`currency__arrow ${
                this.state.showCurrencies ? 'currency__arrow--flip' : ''
              }`}
            >
              &#x2304;
            </span>
          </div>
          <div className="navigation__cart">
            <img src={cartBlack} alt="" onClick={() => peekCart()} />
            {cart?.length && (
              <span className="navigation__cart--count">{cart.length}</span>
            )}
          </div>
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  const { currencies, currency, cart } = state.shop
  return {
    currencies,
    currency,
    cart,
  }
}

const mapDispatchToProps = {
  getCurrencies,
  setCurrency,
  getCategory,
  loadCart,
  peekCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(TopBar)
