import { gql } from 'graphql-request';

export const GET_ORDER_BY_ID = gql`
  query getOrderById($id: ID!) {
    node(id: $id) {
      ... on Order {
        id
        orderNumber
        processedAt
        financialStatus
        fulfillmentStatus
        totalPrice {
          amount
          currencyCode
        }
        totalShippingPrice {
          amount
          currencyCode
        }
        totalTax {
          amount
          currencyCode
        }
        subtotalPrice {
          amount
          currencyCode
        }
        shippingAddress {
          firstName
          lastName
          address1
          address2
          city
          province
          zip
          country
        }
        lineItems(first: 50) {
          edges {
            node {
              title
              quantity
              originalTotalPrice {
                amount
                currencyCode
              }
              variant {
                title
                image {
                  url
                  altText
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;