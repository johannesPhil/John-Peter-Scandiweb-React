const initialState = {
  loading: false,
  currencies: [],
  currency: localStorage.getItem('currency') || '$',
  allProducts: '',
  currentCategory: '',
  product: '',
  // eslint-disable-next-line no-restricted-globals
  category: { name, products: [] },
  error: null,
  cart: [],
  message: null,
  overlay: false,
  miniCart: false,
  mainCart: false,
}

export const shop = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'LOADING':
      return {
        ...state,
        loading: true,
      }
    case 'CLEAR_MESSAGE':
      return { ...state, message: null }

    case 'GET_CATEGORY':
      return {
        ...state,
        loading: false,
        category: payload,
      }

    case 'GET_CATEGORY_ERROR':
      return {
        ...state,
        loading: false,
        category: null,
        error: payload,
      }

    case 'PRODUCT_DATA':
      return { ...state, product: payload, error: null, loading: false }

    case 'GET_CURRENCIES':
      return {
        ...state,
        loading: false,
        currencies: payload,
      }

    case 'GET_CURRENCIES_ERROR':
      return {
        ...state,
        loading: false,
        currencies: null,
        error: payload,
      }

    case 'SET_CURRENCY':
      return {
        ...state,
        loading: false,
        currency: payload,
      }

    case 'LOAD_CART':
      return { ...state, cart: payload }

    case 'ADD_TO_CART':
      return { ...state, cart: payload, message: 'Item added to Cart' }
    case 'SHOW_CART_MODAL':
      return { ...state, overlay: !state.overlay, miniCart: !state.miniCart }
    case 'FULL_CART':
      return { ...state, mainCart: true }

    case 'CLOSE_FULL_CART':
      return { ...state, mainCart: false }
    default:
      return state
  }
}
