export const GET_PRODUCT_BY_HANDLE = /* GraphQL */ `
  query GetProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      description

      featuredImage {
        url
        altText
      }

      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }

      options {
        name
        values
      }

      variants(first: 50) {
        nodes {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;