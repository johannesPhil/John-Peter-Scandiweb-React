export const categoriesQuery = `
    query Categories {
  categories {
    name
    products {
      attributes {
        id
        items {
          value
        }
      }
      brand
      category
      description
      gallery
      id
      inStock
      name
      prices {
        amount
        currency {
          label
          symbol
        }
      }
    }
  }
}
`
