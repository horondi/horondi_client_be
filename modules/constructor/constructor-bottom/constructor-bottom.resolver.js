const constructorService = require('../constructor.services');
const {
  CONSTRUCTOR_BOTTOM_NOT_FOUND,
  CONSTRUCTOR_BOTTOM_ALREADY_EXIST,
} = require('../../../error-messages/constructor-bottom.messages');
const ConstructorBottom = require('./constructor-bottom.model');
const {
  STATUS_CODES: { NOT_FOUND, BAD_REQUEST },
} = require('../../../consts/status-codes');

const constructorBottomQuery = {
  getConstructorBottomById: async (parent, args) => {
    try {
      return await constructorService.getConstructorElementById(
        args.id,
        ConstructorBottom
      );
    } catch (e) {
      return {
        statusCode: NOT_FOUND,
        message: e.message,
      };
    }
  },

  getAllConstructorBottom: async (parent, args) =>
    await constructorService.getAllConstructorElements(args, ConstructorBottom),
};

const constructorBottomMutation = {
  addConstructorBottom: async (parent, args) => {
    try {
      return await constructorService.addConstructorElement(
        args,
        ConstructorBottom,
        CONSTRUCTOR_BOTTOM_ALREADY_EXIST
      );
    } catch (e) {
      return {
        statusCode: BAD_REQUEST,
        message: e.message,
      };
    }
  },

  updateConstructorBottom: async (parent, args) => {
    try {
      return await constructorService.updateConstructorElement(
        args,
        ConstructorBottom,
        CONSTRUCTOR_BOTTOM_NOT_FOUND
      );
    } catch (e) {
      return {
        statusCode:
          e.message === CONSTRUCTOR_BOTTOM_NOT_FOUND ? NOT_FOUND : BAD_REQUEST,
        message: e.message,
      };
    }
  },

  deleteConstructorBottom: async (parent, args) => {
    try {
      return await constructorService.deleteConstructorElement(
        args.id,
        ConstructorBottom,
        CONSTRUCTOR_BOTTOM_NOT_FOUND
      );
    } catch (e) {
      return {
        statusCode: NOT_FOUND,
        message: e.message,
      };
    }
  },
};

module.exports = { constructorBottomQuery, constructorBottomMutation };
