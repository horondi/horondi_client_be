const modelsService = require('./model.service');
const { MODEL_NOT_FOUND } = require('../../error-messages/model.messages');
const modelService = require('./model.service');

const modelsQuery = {
  getModelsByCategory: async (parent, args) => await modelsService.getModelsByCategory(args.id),
};

const modelsMutation = {
  addModel: async (parent, args) => {
    try {
      return await modelsService.addModel(args.model);
    } catch (e) {
      return {
        statusCode: 400,
        message: e.message,
      };
    }
  },
  updateModel: async (parent, args) => {
    try {
      return await modelService.updateModel(args.id, args.model);
    } catch (e) {
      return {
        statusCode: e.message === MODEL_NOT_FOUND ? 404 : 400,
        message: e.message,
      };
    }
  },
  deleteModel: async (parent, args) => {
    const deletedModel = await modelsService.deleteModel(args.id);
    if (deletedModel) {
      return deletedModel;
    }
    return {
      statusCode: 404,
      message: MODEL_NOT_FOUND,
    };
  },
};

module.exports = { modelsQuery, modelsMutation };
