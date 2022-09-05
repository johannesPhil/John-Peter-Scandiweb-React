import { applyMiddleware, createStore, compose } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'

import { rootReducer } from './reducers'
import thunk from 'redux-thunk'

const middleWare = [thunk]

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancers = composeEnhancers(applyMiddleware(...middleWare))

const shoppingStore = createStore(rootReducer, {}, enhancers)

export default shoppingStore
