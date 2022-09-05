import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import filterPrice from '../utils/priceFilter'
import { addToCart } from '../store/actions/shoppingActions'
import Close from './Close'

class ProductDetails extends Component {
  constructor(props) {
    super(props)
    this.addAttribute = this.addAttribute.bind(this)
    this.addToCart = this.addToCart.bind(this)
    this.state = {
      product: '',
      preview: this.props.product ? this.props.product.gallery[0] : '',
      attributes:
        this.props.product &&
        [
          ...this.props.product.attributes.map((att) => ({ [att.name]: '' })),
        ].reduce((obj, item) => ((obj[Object.keys(item)] = ''), obj)),
    }
  }

  addAttribute(e) {
    let property = e.target.dataset.attribute,
      value = e.target.dataset.attributevalue
    let currAttr = { ...this.state.attributes }
    currAttr[property] = value
    this.setState({ attributes: currAttr })
  }

  addToCart(product) {
    let selectedOptions = this.state.attributes
    this.props.addToCart({ ...product, selectedOptions })
  }

  componentDidMount() {
    this.setState({ product: this.props.product })
  }

  componentDidUpdate(prevProps) {
    if (this.props.product.id !== prevProps.product.id) {
      this.setState({
        product: this.props.product,
        preview: this.props.product?.gallery[0],
      })
    }
  }

  render() {
    const { product } = this.state
    const { status, currency } = this.props
    const emptyProduct = Object.keys(product).length === 0
    return !emptyProduct ? (
      <>
        <div className={`item ${status ? 'item__show' : ''}`}>
          <Close
            color="#cecece"
            className="item__hide"
            close={this.props.toggleView}
          />
          <div className="item__images">
            <div className="item__images--thumbs">
              {product.gallery?.map((image, index) => (
                <span
                  className="item__images--thumb"
                  key={index}
                  onClick={() =>
                    this.setState({ preview: product.gallery[index] })
                  }
                >
                  <img src={image} alt="" />
                </span>
              ))}
            </div>
            <div className="item__images--preview">
              <img src={this.state.preview} alt="" />
            </div>
          </div>
          <div className="item__description">
            <p className="item__name">{product.name}</p>
            <p className="item__desc">{product.brand}</p>
            <div className="item__attributes">
              {product.attributes.map((attribute, index) => (
                <div className="item__attribute" key={index}>
                  <p className="item__label">{`${attribute.name}:`}</p>
                  <div className="item__attribute--items">
                    {attribute.items.map((item, index) => (
                      <span
                        className={`item__attribute--item ${
                          this.state.attributes[attribute.name] === item.value
                            ? 'item__attribute--item-selected'
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
            <div className="item__attribute">
              <p className="item__label">price:</p>
              <p className="item__price">
                {' '}
                {`${currency}${filterPrice(
                  product.prices,
                )?.toLocaleString()}`}{' '}
              </p>
            </div>
            <div className="item__action">
              <button
                className="item__btn"
                onClick={() => this.addToCart(product)}
              >
                Add To Cart
              </button>
            </div>
            <div
              className="item__description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </div>
        </div>
      </>
    ) : (
      <p>Null</p>
    )
  }
}

const mapStateToProps = (state) => {
  const { product, currency } = state.shop
  return {
    product,
    currency,
  }
}

const mapDispatchToProps = {
  addToCart,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
