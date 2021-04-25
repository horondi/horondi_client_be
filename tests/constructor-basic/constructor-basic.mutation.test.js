const mongoose = require('mongoose');
const { setupApp } = require('../helper-functions');
const {
  createMaterial,
  deleteMaterial,
} = require('../materials/material.helper');
const { createColor, deleteColor } = require('../color/color.helper');
const {
  getConstructorBasicById,
  deleteConstructorBasic,
  updateConstructorBasic,
  createConstructorBasic,
} = require('./constructor-basic.helper');
const {
  wrongId,
  newConstructorBasic,
  getConstructorData,
  getConstructorDataForUpt,
} = require('./constructor-basic.variables');
const {
  getMaterial,
  getMaterialToUpdate,
} = require('../materials/material.variables');
const {
  CONSTRUCTOR_ELEMENT_NOT_FOUND,
  CONSTRUCTOR_ELEMENT_ALREADY_EXIST,
} = require('../../error-messages/constructor-element-messages');
const {
  STATUS_CODES: { NOT_FOUND, BAD_REQUEST },
} = require('../../consts/status-codes');
const { color } = require('../color/color.variables');
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
  materialInput,
  receivedMaterial,
  materialId,
  modelId,
  categoryId,
  sizeId,
  constructorInput,
  constructorBasicId,
  currentConstructorBasic = {},
  constructorUpdateInput,
  currentconstructorUpdate;

jest.mock('../../modules/currency/currency.utils.js');
jest.mock('../../modules/upload/upload.service.js');
// const uploadService = require('../upload/upload.service');
// const { uploadSmallImage } = require('../upload/upload.utils');

describe('constructor mutations', () => {
  beforeAll(async () => {
    operations = await setupApp();
    const colorData = await createColor(color, operations);
    colorId = colorData._id;
    materialInput = getMaterial(colorId);
    receivedMaterial = await createMaterial(materialInput, operations);
    materialId = receivedMaterial._id;
    const categoryData = await createCategory(newCategoryInputData, operations);
    categoryId = categoryData._id;
    const sizeData = await createSize(size1, operations);
    sizeId = sizeData._id;
    const modelData = await createModel(
      newModel(categoryId, sizeId),
      operations
    );
    modelId = modelData._id;
    constructorInput = newConstructorBasic(materialId, colorId, modelId);

    constructorUpdateInput = getConstructorDataForUpt(
      materialId,
      colorId,
      modelId
    );
    currentconstructorUpdate = getConstructorData(constructorUpdateInput, {
      materialId,
      colorId,
      modelId,
    });
    currentConstructorBasic = getConstructorData(constructorInput, {
      materialId,
      colorId,
      modelId,
    });
  });

  test('#1 Should add Constructor Basic', async done => {
    const createConstructor = await createConstructorBasic(
      constructorInput,
      operations
    );

    constructorBasicId = createConstructor._id;

    expect(createConstructor).toBeDefined();
    expect(createConstructor).toEqual({
      ...currentConstructorBasic,
      _id: constructorBasicId,
    });
    done();
  });
  test('#3 ConstructorBasic should return Error ConstructorBasic already exist', async done => {
    const createConstructor = await createConstructorBasic(
      constructorInput,
      operations
    );

    expect(createConstructor).toBeDefined();
    expect(createConstructor.message).toEqual(
      CONSTRUCTOR_ELEMENT_ALREADY_EXIST
    );
    expect(createConstructor.statusCode).toEqual(BAD_REQUEST);
    done();
  });
  test('#2 Should update existing constructorBasic ', async done => {
    const updateConstructor = await updateConstructorBasic(
      constructorUpdateInput,
      constructorBasicId,
      operations
    );

    expect(updateConstructor).toBeDefined();
    expect(updateConstructor).toEqual({
      ...currentconstructorUpdate,
      _id: constructorBasicId,
    });
    done();
  });
  test('#4 UpdateConstructorBasic should return CONSTRUCTOR_ELEMENT_NOT_FOUND', async done => {
    const updateConstructor = await updateConstructorBasic(
      constructorInput,
      wrongId,
      operations
    );
    const result = updateConstructor.message;

    expect(result).toBe(CONSTRUCTOR_ELEMENT_NOT_FOUND);
    done();
  });
  test('#5 deleteConstructorBasic should return error CONSTRUCTOR_ELEMENT_NOT_FOUND', async done => {
    const deletedConstructor = await deleteConstructorBasic(
      wrongId,
      operations
    );
    const result = deletedConstructor.data.deleteConstructorBasic.message;

    expect(result).toBe(CONSTRUCTOR_ELEMENT_NOT_FOUND);
    done();
  });
  test('#6 Should delete constructor basic and return id', async done => {
    const deletedConstructor = await deleteConstructorBasic(
      constructorBasicId,
      operations
    );
    const result = deletedConstructor.data.deleteConstructorBasic._id;

    expect(result).toBe(constructorBasicId);
    done();
  });

  afterAll(async done => {
    mongoose.connection.db.dropDatabase(done);
  });
});
