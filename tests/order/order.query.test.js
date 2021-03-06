const { ORDER_NOT_FOUND } = require('../../error-messages/orders.messages');
const {
  deleteOrder,
  createOrder,
  getOrderById,
  getAllOrders,
} = require('./order.helpers');
const { wrongId, newOrderInputData } = require('./order.variables');
const { newProductInputData } = require('../product/product.variables');
const { createProduct, deleteProduct } = require('../product/product.helper');
const {
  deleteConstructorBasic,
  createConstructorBasic,
} = require('../constructor-basic/constructor-basic.helper');
const {
  newConstructorBasic,
} = require('../constructor-basic/constructor-basic.variables');
const { createColor, deleteColor } = require('../color/color.helper');
const { color } = require('../color/color.variables');
const {
  createMaterial,
  deleteMaterial,
} = require('../materials/material.helper');
const { getMaterial } = require('../materials/material.variables');
const {
  createCategory,
  deleteCategory,
} = require('../category/category.helper');
const { newCategoryInputData } = require('../category/category.variables');
const { createClosure, deleteClosure } = require('../closure/closure.helper');
const { newClosure } = require('../closure/closure.variables');
const { createModel, deleteModel } = require('../model/model.helper');
const { newModel } = require('../model/model.variables');
const { createSize, deleteSize } = require('../size/size.helper');
const { SIZES_TO_CREATE } = require('../size/size.variables');
const { createPattern, deletePattern } = require('../pattern/pattern.helper');
const { queryPatternToAdd } = require('../pattern/pattern.variables');
const { setupApp } = require('../helper-functions');

jest.mock('../../modules/upload/upload.service');
jest.mock('../../modules/currency/currency.model.js');
jest.mock('../../modules/currency/currency.utils.js');
jest.mock('../../modules/product/product.utils.js');

let colorId;
let sizeId;
let productId;
let orderId;
let modelId;
let operations;
let materialId;
let categoryId;
let patternId;
let constructorBasicId;
let closureId;

describe('Order queries', () => {
  beforeAll(async () => {
    operations = await setupApp();
    const sizeData = await createSize(SIZES_TO_CREATE.size1, operations);
    sizeId = sizeData._id;
    const colorData = await createColor(color, operations);
    colorId = colorData._id;
    const categoryData = await createCategory(newCategoryInputData, operations);
    categoryId = categoryData._id;
    const materialData = await createMaterial(getMaterial(colorId), operations);
    materialId = materialData._id;
    const patternData = await createPattern(queryPatternToAdd, operations);
    patternId = patternData._id;
    const closureData = await createClosure(newClosure(materialId), operations);
    closureId = closureData._id;
    const constructorBasicData = await createConstructorBasic(
      newConstructorBasic(materialId, colorId),
      operations
    );
    constructorBasicId = constructorBasicData._id;
    const modelData = await createModel(
      newModel(categoryId, sizeId),
      operations
    );
    modelId = modelData._id;
    const productData = await createProduct(
      newProductInputData(
        categoryId,
        modelId,
        materialId,
        materialId,
        colorId,
        patternId,
        closureId,
        sizeId
      ),
      operations
    );
    productId = productData._id;
    const orderData = await createOrder(
      newOrderInputData(productId, modelId, sizeId, constructorBasicId),
      operations
    );
    orderId = orderData._id;
  });

  const {
    user,
    userComment,
    delivery,
    paymentStatus,
    status,
  } = newOrderInputData(productId, modelId, sizeId, constructorBasicId);

  test('Should receive all orders', async () => {
    const orders = await getAllOrders(operations);

    expect(orders).toBeDefined();
    expect(orders.length).toBeGreaterThan(0);
    expect(orders).toBeInstanceOf(Array);
    expect(orders[0]).toHaveProperty('user', user);
  });
  test('should receive order by id', async () => {
    const {
      data: { getOrderById: order },
    } = await getOrderById(orderId, operations);

    expect(order).toBeDefined();
    expect(order).toBeTruthy();
    expect(order.items).toBeInstanceOf(Array);
    expect(order).toHaveProperty('userComment', userComment);
    expect(order).toHaveProperty('delivery', delivery);
    expect(order).toHaveProperty('paymentStatus', paymentStatus);
    expect(order).toHaveProperty('status', status);
  });
  test('Should throw error ORDER_NOT_FOUND', async () => {
    const { errors } = await getOrderById(wrongId, operations);

    expect(errors[0].message).toEqual(ORDER_NOT_FOUND);
  });
  afterAll(async () => {
    await deleteOrder(orderId, operations);
    await deleteProduct(productId, operations);
    await deleteModel(modelId, operations);
    await deleteConstructorBasic(constructorBasicId, operations);
    await deleteMaterial(materialId, operations);
    await deleteColor(colorId, operations);
    await deleteSize(sizeId, operations);
    await deleteClosure(closureId, operations);
    await deletePattern(patternId, operations);
    await deleteCategory(categoryId, operations);
  });
});
