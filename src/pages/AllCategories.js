import React, { Component } from 'react'
import { getCategory } from '../store/actions/shoppingActions'
import { connect } from 'react-redux'
import EmptyResult from '../components/EmptyResult'
import ItemDisplay from '../components/ItemDisplay'

import Price from '../utils/priceFilter'

class AllCategories extends Component {
  constructor(props) {
    super(props)
    //
  }

  componentDidMount() {
    this.props.getCategory(window.location.pathname.split('/')[2])
  }
  render() {
    const { category } = this.props
    return (
      <>
        {!category.products.length ? (
          <EmptyResult text="Could not fetch the required data. Please try again" />
        ) : (
          <ItemDisplay category={category} />
        )}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  const { category, currency, currencies, loading } = state.shop
  return {
    category,
    currency,
    currencies,
    loading,
  }
}
const mapDispatchToProps = {
  getCategory,
}

export default connect(mapStateToProps, mapDispatchToProps)(AllCategories)
