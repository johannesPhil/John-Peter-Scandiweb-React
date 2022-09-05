import { categoriesQuery, currencyQuery } from '../../graphql'
import axios from 'axios'
import { productQuery } from '../../graphql/queries'

const endPoint = 'http://localhost:4000'

export const loadRequest = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOADING',
    })
  }
}

export const getCategory = (category) => {
  return (dispatch) => {
    dispatch(loadRequest())
    axios({
      url: endPoint,
      method: 'post',
      headers: { 'content-type': 'application/json' },
      data: {
        query: categoriesQuery,
        variables: {
          input: {
            title: category,
          },
        },
      },
    })
      .then((response) => {
        dispatch({
          type: 'GET_CATEGORY',
          payload: response.data.data.category,
        })
      })
      .catch((error) => {
        if (error.message) {
          const {
            data: { errors },
          } = error.response

          dispatch({
            type: 'GET_CATEGORY_ERROR',
            payload: error.message,
          })
        } else if (error.request) {
          dispatch({
            type: 'GET_CATEGORY_ERROR',
            payload: error.message,
          })
        } else {
          dispatch({
            type: 'GET_CATEGORY_ERROR',
            payload: error.message,
          })
        }
      })
  }
}

export const getCurrencies = () => {
  return (dispatch) => {
    dispatch(loadRequest())
    axios({
      url: endPoint,
      method: 'post',
      headers: { 'content-type': 'application/json' },
      data: {
        query: currencyQuery,
      },
    })
      .then((response) => {
        dispatch({
          type: 'GET_CURRENCIES',
          payload: response.data.data.currencies,
        })
      })
      .catch((error) => {
        console.log(error)
        if (error.response) {
          const {
            data: { errors },
          } = error.response

          dispatch({
            type: 'GET_CURRENCIES_ERROR',
            payload: errors[0].message,
          })
        } else if (error.request) {
          dispatch({
            type: 'GET_CURRENCIES_ERROR',
            payload: error.message,
          })
        } else {
          dispatch({
            type: 'GET_CURRENCIES_ERROR',
            payload: error.message,
          })
        }
      })
  }
}

export const getProduct = (id) => {
  return (dispatch) => {
    dispatch(loadRequest())
    axios({
      url: endPoint,
      method: 'post',
      headers: { 'content-type': 'application/json' },
      data: {
        query: productQuery,
        variables: {
          productId: id,
        },
      },
    })
      .then((response) => {
        dispatch({
          type: 'PRODUCT_DATA',
          payload: response.data.data.product,
        })
      })
      .catch((error) => {
        if (error.response) {
          const {
            data: { errors },
          } = error.response

          dispatch({
            type: 'PRODUCT_DATA_ERROR',
            payload: errors[0].message,
          })
        } else if (error.request) {
          dispatch({
            type: 'PRODUCT_DATA_ERROR',
            payload: error.message,
          })
        } else {
          dispatch({
            type: 'PRODUCT_DATA_ERROR',
            payload: error.message,
          })
        }
      })
  }
}

export const setCurrency = (currency) => {
  return (dispatch) => {
    localStorage.setItem('currency', currency)
    dispatch({
      type: 'SET_CURRENCY',
      payload: currency,
    })
  }
}

export const setCategory = (category) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_CATEGORY',
      payload: category,
    })
  }
}

export const addToCart = (product) => {
  console.log({ init: product })
  let cartItems = []
  let savedItems = localStorage.getItem('scandiweb-cart')
  let newProduct = product
  newProduct.quantity = 1
  console.log({ quant: newProduct })
  return (dispatch) => {
    if (!savedItems) {
      cartItems.push(newProduct)
      localStorage.setItem('scandiweb-cart', JSON.stringify(cartItems))
    } else {
      let productMatch = false
      cartItems = JSON.parse(savedItems)
      cartItems.map((item, index) => {
        if (item.name === newProduct.name) {
          cartItems[index].quantity++
          productMatch = true
        }
      })
      if (!productMatch) {
        cartItems.push(newProduct)
      }
      localStorage.setItem('scandiweb-cart', JSON.stringify(cartItems))
    }
    dispatch({
      type: 'ADD_TO_CART',
      payload: JSON.parse(localStorage.getItem('scandiweb-cart')),
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE',
      })
    }, 3000)
  }
}

export const loadCart = () => {
  return (dispatch) => {
    dispatch({
      type: 'LOAD_CART',
      payload: JSON.parse(localStorage.getItem('scandiweb-cart')),
    })
  }
}

export const peekCart = () => {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_CART_MODAL',
    })
  }
}

export const loadMainCart = () => {
  return (dispatch) => {
    dispatch({
      type: 'FULL_CART',
    })
  }
}

export const closeMainCart = () => {
  return (dispatch) => {
    dispatch({
      type: 'CLOSE_FULL_CART',
    })
  }
}
