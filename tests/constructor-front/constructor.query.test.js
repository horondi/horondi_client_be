const mongoose = require('mongoose');
const { setupApp } = require('../helper-functions');
const {
  createConstructorFrontPocket,
  getAllConstructorFrontPocket,
  getConstructorFrontPocketById,
  deleteConstructorFrontPocket,
} = require('./constructor.front.helper');
const {
  getConstructorData,
  newConstructorFront,
  wrongId,
} = require('./constructor.variables');
const { createColor, deleteColor } = require('../color/color.helper');
const {
  createMaterial,
  deleteMaterial,
} = require('../materials/material.helper');
const { color } = require('../color/color.variables');
const { getMaterial } = require('../materials/material.variables');
const {
  CONSTRUCTOR_ELEMENT_NOT_FOUND,
} = require('../../error-messages/constructor-element-messages');
const {
  STATUS_CODES: { NOT_FOUND },
} = require('../../consts/status-codes');
const { createModel, deleteModel } = require('../model/model.helper');
const { newModel } = require('../model/model.variables');
const {
  createCategory,
  deleteCategory,
} = require('../category/category.helper');
const { newCategoryInputData } = require('../category/category.variables');
const { createSize, deleteSize } = require('../size/size.helper');
const {
  SIZES_TO_CREATE: { size1 },
} = require('../size/size.variables');

let operations,
  colorId,
  materialId,
  modelId,
  sizeId,
  categoryId,
  constructorInput,
  constructorFrontId,
  constructorFrontPocket,
  currentConstructorFrontPocket;

jest.mock('../../modules/upload/upload.service');
jest.mock('../../modules/currency/currency.utils.js');
jest.mock('../../modules/currency/currency.model.js');

describe('constructor mutations', () => {
  beforeAll(async () => {
    operations = await setupApp();
    const colorData = await createColor(color, operations);
    colorId = colorData._id;
    const materialData = await createMaterial(getMaterial(colorId), operations);
    materialId = materialData._id;
    const categoryData = await createCategory(newCategoryInputData, operations);
    categoryId = categoryData._id;
    const sizeData = await createSize(size1, operations);
    sizeId = sizeData._id;
    const modelData = await createModel(
      newModel(categoryId, sizeId),
      operations
    );
    modelId = modelData._id;
    constructorInput = newConstructorFront(materialId, colorId, modelId);
    constructorFrontPocket = await createConstructorFrontPocket(
      constructorInput,
      operations
    );
    constructorFrontId = constructorFrontPocket._id;

    currentConstructorFrontPocket = getConstructorData(constructorInput, {
      materialId,
      colorId,
      modelId,
    });
  });

  test('#1 Should return all Constructor Front Pocket', async () => {
    const receivedAllConstructorFrontPocket = await getAllConstructorFrontPocket(
      operations
    );
    expect(receivedAllConstructorFrontPocket.items).toBeDefined();
    expect(receivedAllConstructorFrontPocket.items.length).toBeGreaterThan(0);
  });
  test('#2 Should return  Constructor Front Pocket by Id', async () => {
    const receivedById = await getConstructorFrontPocketById(
      constructorFrontId,
      operations
    );

    expect(receivedById).toBeDefined();
    expect(receivedById).toEqual({
      ...currentConstructorFrontPocket,
      _id: constructorFrontId,
    });
  });
  test('#3 Should return  Error', async () => {
    const receivedError = await getConstructorFrontPocketById(
      wrongId,
      operations
    );

    expect(receivedError.statusCode).toBe(NOT_FOUND);
    expect(receivedError.message).toBe(CONSTRUCTOR_ELEMENT_NOT_FOUND);
  });

  afterAll(async done => {
    mongoose.connection.db.dropDatabase(done);
  });
});
