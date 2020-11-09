const Product = require('./product.model');
const Size = require('../../models/Size');
const modelService = require('../model/model.service');

const {
  PRODUCT_ALREADY_EXIST,
  PRODUCT_NOT_FOUND,
} = require('../../error-messages/products.messages');

class ProductsService {
  getProductById(id) {
    return Product.findById(id);
  }

  getSizeById(id) {
    return Size.findById(id);
  }

  getModelsByCategory(id) {
    return Product.find({ category: id });
  }

  filterItems(args = {}) {
    const filter = {};
    const {
      pattern,
      colors,
      price,
      category,
      isHotItem,
      models,
      currency,
    } = args;

    if (isHotItem) {
      filter.isHotItem = isHotItem;
    }
    if (category && category.length) {
      filter.category = { $in: category };
    }
    if (models && models.length) {
      filter.model = {
        $elemMatch: {
          value: { $in: models },
        },
      };
    }
    if (colors && colors.length) {
      filter.colors = {
        $elemMatch: {
          simpleName: {
            $elemMatch: {
              value: { $in: colors },
            },
          },
        },
      };
    }
    if (pattern && pattern.length) {
      filter.pattern = {
        $elemMatch: {
          value: { $in: pattern },
        },
      };
    }
    if (price && price.length) {
      const currencySign = currency === 0 ? 'UAH' : currency === 1 ? 'USD' : '';
      filter.basePrice = {
        $elemMatch: {
          currency: currencySign,
          value: {
            $gte: price[0],
            $lte: price[1],
          },
        },
      };
    }
    return filter;
  }

  async getProducts({
    filter, skip, limit, sort, search,
  }) {
    const filters = this.filterItems(filter);
    if (!(!search || search.trim().length === 0)) {
      filters.$or = [
        {
          name: { $elemMatch: { value: { $regex: new RegExp(search, 'i') } } },
        },
        {
          description: {
            $elemMatch: { value: { $regex: new RegExp(search, 'i') } },
          },
        },
      ];
    }
    const items = await Product.find(filters)
      .skip(skip)
      .limit(limit)
      .sort(sort);

    const count = await Product.find(filters).countDocuments();
    return {
      items,
      count,
    };
  }

  async updateProduct(id, productData) {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error(PRODUCT_NOT_FOUND);
    }
    if (await this.checkProductExist(productData, id)) {
      throw new Error(PRODUCT_ALREADY_EXIST);
    }
    const model = await modelService.getModelById(productData.model);
    productData.model = model.name;
    return Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async addProduct(data) {
    if (await this.checkProductExist(data)) {
      throw new Error(PRODUCT_ALREADY_EXIST);
    }
    const model = await modelService.getModelById(data.model);
    data.model = model.name;
    return new Product(data).save();
  }

  deleteProduct(id) {
    return Product.findByIdAndDelete(id);
  }

  async checkProductExist(data, id) {
    const modelCount = await Product.countDocuments({
      _id: { $ne: id },
      name: {
        $elemMatch: {
          $or: [{ value: data.name[0].value }, { value: data.name[1].value }],
        },
      },
    });
    return modelCount > 0;
  }
}
module.exports = new ProductsService();
