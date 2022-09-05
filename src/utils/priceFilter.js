import shoppingStore from '../store'

export default function filterPrice(priceArray) {
  const {
    shop: { currencies, currency },
  } = shoppingStore.getState()
  if (currencies.length > 0) {
    let priceObject = priceArray.filter(
      (price) => price.currency.symbol === currency,
    )
    return priceObject[0]?.amount
  }
}
