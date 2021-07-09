const { gql } = require('@apollo/client');

const createProduct = async (product, operations) => {
  const createdProduct = await operations.mutate({
    mutation: gql`
      mutation($product: ProductInput!) {
        addProduct(product: $product, upload: []) {
          ... on Product {
            _id
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    variables: {
      product,
    },
  });

  return createdProduct.data.addProduct;
};
const updateProduct = async (id, product, operations) =>
  await operations.mutate({
    mutation: gql`
      mutation($id: ID!, $product: ProductInput!) {
        updateProduct(id: $id, product: $product, upload: []) {
          ... on Product {
            _id
            category {
              _id
            }
            model {
              _id
            }
            name {
              lang
              value
            }
            description {
              lang
              value
            }
            mainMaterial {
              material {
                _id
              }
              color {
                _id
              }
            }
            innerMaterial {
              material {
                _id
              }
              color {
                _id
              }
            }
            bottomMaterial {
              material {
                _id
              }
              color {
                _id
              }
            }
            strapLengthInCm
            closure {
              _id
            }
            pattern {
              _id
            }
            sizes {
              size {
                _id
              }
            }
            availableCount
          }
          ... on Error {
            statusCode
            message
          }
        }
      }
    `,
    variables: {
      id,
      product,
    },
  });
const getProductById = async (id, operations) =>
  await operations.query({
    query: gql`
      query($id: ID!) {
        getProductById(id: $id) {
          ... on Product {
            _id
            category {
              _id
            }
            model {
              _id
            }
            name {
              lang
              value
            }
            description {
              lang
              value
            }
            mainMaterial {
              material {
                _id
              }
              color {
                _id
              }
            }
            innerMaterial {
              material {
                _id
              }
              color {
                _id
              }
            }
            bottomMaterial {
              material {
                _id
              }
              color {
                _id
              }
            }
            bottomMaterial {
              material {
                _id
              }
              color {
                _id
              }
            }
            strapLengthInCm
            closure {
              _id
            }
            pattern {
              _id
            }
            sizes {
              size {
                _id
              }
            }
            availableCount
            userRates {
              rate
            }
            rateCount
          }
          ... on Error {
            message
            statusCode
          }
        }
      }
    `,
    variables: {
      id,
    },
  });
const deleteProduct = async (id, operations) =>
  await operations.mutate({
    mutation: gql`
      mutation($id: ID!) {
        deleteProduct(id: $id) {
          ... on Product {
            _id
          }
          ... on Error {
            message
          }
        }
      }
    `,
    variables: {
      id,
    },
  });
const getAllProductsWithSkipAndLimit = async (skip, limit, operations) =>
  await operations.query({
    variables: { skip, limit },
    query: gql`
      query($skip: Int, $limit: Int) {
        getProducts(skip: $skip, limit: $limit, filter: { colors: [] }) {
          ... on PaginatedProducts {
            items {
              name {
                lang
                value
              }
            }
          }
        }
      }
    `,
  });

module.exports = {
  deleteProduct,
  createProduct,
  getProductById,
  getAllProductsWithSkipAndLimit,
  updateProduct,
};
