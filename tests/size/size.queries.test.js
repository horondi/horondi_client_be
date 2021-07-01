const { setupApp } = require('../helper-functions');
const { SIZES_TO_CREATE, SIZES_TO_TEST } = require('./size.variables');
const {
  createSize,
  getAllSizes,
  getSizeById,
  deleteSize,
} = require('./size.helper');

jest.mock('../../modules/currency/currency.utils.js');

let operations;
let sizeId;

describe('Sizes queries', () => {
  beforeAll(async () => {
    operations = await setupApp();
    const size = await createSize(SIZES_TO_CREATE.size1, operations);

    sizeId = size._id;
  });

  test('should recieve all sizes', async () => {
    const result = await getAllSizes(operations);

    expect(result[0]).toEqual(SIZES_TO_TEST.size1);
  });
  test('should recieve sizes by ID', async () => {
    const result = await getSizeById(sizeId, operations);

    expect(result).toEqual({
      _id: sizeId,
      ...SIZES_TO_TEST.size1,
    });
  });

  afterAll(async () => {
    await deleteSize(sizeId, operations);
  });
});
