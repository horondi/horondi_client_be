const ordersService = require('./order.service');
const { ORDER_NOT_FOUND } = require('../../error-messages/orders.messages');
const {
  STATUS_CODES: { NOT_FOUND, BAD_REQUEST },
} = require('../../consts/status-codes');

const ordersQuery = {
  getOrderById: async (parent, args) => {
    const order = await ordersService.getOrderById(args.id);
    if (order) {
      return order;
    }
    return {
      statusCode: NOT_FOUND,
      message: ORDER_NOT_FOUND,
    };
  },
  getAllOrders: async (parent, args) => await ordersService.getAllOrders(args),
  getUserOrders: async (parent, args, context) =>
    await ordersService.getUserOrders(context.user),
  getOrdersStatistic: (parent, args) =>
    ordersService.getOrdersStatistic(args.date),
  getPaidOrdersStatistic: (parent, args) =>
    ordersService.getPaidOrdersStatistic(args.date),
};

const ordersMutation = {
  addOrder: async (parent, args) => {
    try {
      return await ordersService.addOrder(args.order);
    } catch (e) {
      return {
        statusCode: BAD_REQUEST,
        message: e.message,
      };
    }
  },
  deleteOrder: async (parent, args) => {
    const deletedOrder = await ordersService.deleteOrder(args.id);
    if (deletedOrder) {
      return deletedOrder;
    }
    return {
      statusCode: NOT_FOUND,
      message: ORDER_NOT_FOUND,
    };
  },
  updateOrder: async (parent, args) => {
    try {
      return await ordersService.updateOrder(args.order, args.id);
    } catch (e) {
      return {
        statusCode: e.message === ORDER_NOT_FOUND ? NOT_FOUND : BAD_REQUEST,
        message: e.message,
      };
    }
  },
};

module.exports = { ordersQuery, ordersMutation };
