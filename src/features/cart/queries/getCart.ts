export const GET_CART = /* GraphQL */ `
  query GetCart($id: ID!) {
    cart(id: $id) {
      id
      checkoutUrl

      lines(first: 20) {
        edges {
          node {
            id
            quantity

            cost {
              totalAmount {
                amount
                currencyCode
              }
            }

            merchandise {
              ... on ProductVariant {
                id
                title

                price {
                  amount
                  currencyCode
                }

                product {
                  title
                }
              }
            }
          }
        }
      }

      cost {
        subtotalAmount {
          amount
          currencyCode
        }
      }
    }
  }
`;
