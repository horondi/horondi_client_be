/* eslint-disable no-undef */
const { gql } = require('@apollo/client');
const { newOrder, deliveryOrder } = require('./order.variables');
const { setupApp } = require('../helper-functions');
jest.mock('../../modules/upload/upload.service');
jest.mock('../../modules/currency/currency.model.js');
jest.mock('../../modules/delivery/delivery.service.js');

let orderId;
let operations;

describe('Order queries', () => {
  beforeAll(async () => {
    operations = await setupApp();
  });

  beforeAll(async () => {
    const createOrder = await operations.mutate({
      mutation: gql`
        mutation($order: OrderInput!) {
          addOrder(order: $order) {
            ... on Order {
              _id
            }
            ... on Error {
              message
            }
          }
        }
      `,
      variables: { order: newOrder },
    });
    orderId = createOrder.data.addOrder._id;
  });

  test('Should receive all orders', async () => {
    const res = await operations.query({
      query: gql`
        query {
          getAllOrders {
            items {
              user {
                email
                lastName
                firstName
                phoneNumber
                patronymicName
              }
              dateOfCreation
              delivery {
                sentOn
                sentBy
                byCourier
                invoiceNumber
                courierOffice
              }
              isPaid
              status
              address {
                appartment
                buildingNumber
                region
                street
                city
                country
                zipcode
              }
              userComment
              lastUpdatedDate
              cancellationReason
              adminComment
              items {
                bottomColor {
                  lang
                  value
                }
                closure {
                  lang
                  value
                }
                model {
                  lang
                  value
                }
                closureColor
                size {
                  widthInCm
                  weightInKg
                  heightInCm
                  volumeInLiters
                  depthInCm
                }
                additions {
                  lang
                  value
                }
                actualPrice {
                  currency
                  value
                }
                name {
                  lang
                  value
                }
                pattern {
                  lang
                  value
                }
                category {
                  lang
                  value
                }
                quantity
                colors {
                  lang
                  value
                }
                subcategory {
                  lang
                  value
                }
                bottomMaterial {
                  lang
                  value
                }
              }
              totalItemsPrice {
                currency
                value
              }
              totalPriceToPay {
                currency
                value
              }
              paymentMethod
            }
          }
        }
      `,
    });
    const orders = res.data.getAllOrders.items;

    expect(orders).toBeDefined();
    expect(orders.length).toBeGreaterThan(0);
    expect(orders).toBeInstanceOf(Array);
    expect(orders[0]).toHaveProperty('user', newOrder.user);
    expect(orders[0]).toHaveProperty('category', newOrder.category);
    expect(orders[0]).toHaveProperty('pattern', newOrder.pattern);
  });

  test('should recive order by id', async () => {
    const res = await operations.query({
      query: gql`
        query($id: ID!) {
          getOrderById(id: $id) {
            ... on Order {
              user {
                email
                lastName
                firstName
                phoneNumber
                patronymicName
              }
              dateOfCreation
              delivery {
                sentOn
                sentBy
                byCourier
                invoiceNumber
                courierOffice
              }
              isPaid
              status
              address {
                appartment
                buildingNumber
                region
                street
                city
                country
                zipcode
              }
              userComment
              lastUpdatedDate
              cancellationReason
              adminComment
              items {
                bottomColor {
                  lang
                  value
                }
                closure {
                  lang
                  value
                }
                model {
                  lang
                  value
                }
                closureColor
                size {
                  widthInCm
                  weightInKg
                  heightInCm
                  volumeInLiters
                  depthInCm
                }
                additions {
                  lang
                  value
                }
                actualPrice {
                  currency
                  value
                }
                name {
                  lang
                  value
                }
                pattern {
                  lang
                  value
                }
                category {
                  lang
                  value
                }
                quantity
                colors {
                  lang
                  value
                }
                subcategory {
                  lang
                  value
                }
                bottomMaterial {
                  lang
                  value
                }
              }
              totalItemsPrice {
                currency
                value
              }
              totalPriceToPay {
                currency
                value
              }
              paymentMethod
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `,
      variables: {
        id: orderId,
      },
    });
    const order = res.data.getOrderById;

    expect(order).toBeDefined();
    expect(order).toHaveProperty('status', 'DELIVERED');
    expect(order).toHaveProperty('user', newOrder.user);
    expect(order).toHaveProperty('address', newOrder.address);
    expect(order).toHaveProperty('delivery', deliveryOrder);
    expect(order).toHaveProperty('items', newOrder.items);
    expect(order).toHaveProperty('paymentMethod', 'CARD');
    expect(order).toHaveProperty('totalItemsPrice');
    expect(order).toHaveProperty('totalPriceToPay');
  });

  test('Should throw error ORDER_NOT_FOUND', async () => {
    const res = await operations
      .query({
        query: gql`
          query($id: ID!) {
            getOrderById(id: $id) {
              ... on Order {
                _id
                user {
                  email
                  lastName
                  firstName
                  phoneNumber
                  patronymicName
                }
                dateOfCreation
                delivery {
                  sentOn
                  sentBy
                  byCourier
                  invoiceNumber
                  courierOffice
                }
                isPaid
                status
                address {
                  appartment
                  buildingNumber
                  region
                  street
                  city
                  country
                  zipcode
                }
                userComment
                lastUpdatedDate
                cancellationReason
                adminComment
                items {
                  bottomColor {
                    lang
                    value
                  }
                  closure {
                    lang
                    value
                  }
                  model {
                    lang
                    value
                  }
                  closureColor
                  size {
                    widthInCm
                    weightInKg
                    heightInCm
                    volumeInLiters
                    depthInCm
                  }
                  additions {
                    lang
                    value
                  }
                  actualPrice {
                    currency
                    value
                  }
                  name {
                    lang
                    value
                  }
                  pattern {
                    lang
                    value
                  }
                  category {
                    lang
                    value
                  }
                  quantity
                  colors {
                    lang
                    value
                  }
                  subcategory {
                    lang
                    value
                  }
                  bottomMaterial {
                    lang
                    value
                  }
                }
                totalItemsPrice {
                  currency
                  value
                }
                totalPriceToPay {
                  currency
                  value
                }
                paymentMethod
              }
              ... on Error {
                statusCode
                message
              }
            }
          }
        `,
        variables: {
          id: '5f46a8ac90e86913ed0a95d8',
        },
      })
      .catch(err => err);

    const error = res;
    expect(error.errors[0].message).toEqual('ORDER_NOT_FOUND');
  });

  afterAll(async () => {
    await operations.mutate({
      mutation: gql`
        mutation($id: ID!) {
          deleteOrder(id: $id) {
            ... on Order {
              _id
            }
            ... on Error {
              statusCode
              message
            }
          }
        }
      `,
      variables: { id: orderId },
    });
  });
});
