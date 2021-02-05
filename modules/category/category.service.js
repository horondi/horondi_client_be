const Category = require('./category.model');
const Product = require('../product/product.model');
const Model = require('../model/model.model');
const {
  CATEGORY_ALREADY_EXIST,
  CATEGORY_NOT_FOUND,
  IMAGES_NOT_PROVIDED,
} = require('../../error-messages/category.messages');
const uploadService = require('../upload/upload.service');
const modelService = require('../model/model.service');
const { OTHERS } = require('../../consts');

class CategoryService {
  async getAllCategories() {
    return await Category.find().exec();
  }

  async getCategoryById(id) {
    const category = await Category.findById(id).exec();
    if (category) {
      return category;
    }
    throw new Error(CATEGORY_NOT_FOUND);
  }

  async updateCategory({ id, category, upload }) {
    const categoryToUpdate = await Category.findById(id).exec();
    if (!categoryToUpdate) {
      throw new Error(CATEGORY_NOT_FOUND);
    }

    if (await this.checkCategoryExist(category, id)) {
      throw new Error(CATEGORY_ALREADY_EXIST);
    }

    if (!upload || !Object.keys(upload).length) {
      return await Category.findByIdAndUpdate(id, category, {
        new: true,
      }).exec();
    }
    const uploadResult = await uploadService.uploadFile(upload);

    const images = uploadResult.fileNames;
    if (!images) {
      return await Category.findByIdAndUpdate(id, category).exec();
    }
    const foundCategory = await Category.findById(id)
      .lean()
      .exec();
    uploadService.deleteFiles(Object.values(foundCategory.images));

    return await Category.findByIdAndUpdate(
      id,
      {
        ...category,
        images,
      },
      {
        new: true,
      }
    ).exec();
  }

  async getCategoriesForBurgerMenu() {
    const categories = await this.getAllCategories();

    const data = categories.map(async category => {
      const models = await Model.find({ category: category._id }).exec();
      const modelsFields = models.map(async model => {
        return {
          name: model.name,
          _id: model._id,
        };
      });
      return {
        category: {
          name: [...category.name],
          _id: category._id,
        },
        models: modelsFields,
      };
    });

    return data;
  }

  async addCategory(data, upload) {
    if (!upload) {
      throw new Error(IMAGES_NOT_PROVIDED);
    }

    if (await this.checkCategoryExist(data)) {
      throw new Error(CATEGORY_ALREADY_EXIST);
    }

    const savedCategory = await new Category(data).save();

    const uploadResult = await uploadService.uploadFile(upload);

    savedCategory.images = uploadResult.fileNames;

    return await savedCategory.save();
  }

  async cascadeUpdateRelatives(filter, updateData) {
    await Product.updateMany(filter, updateData).exec();
    await Model.updateMany(filter, updateData).exec();
  }
  async deleteCategory({ deleteId, switchId }) {
    const category = await Category.findByIdAndDelete(deleteId)
      .lean()
      .exec();
    const switchCategory = await Category.findById(switchId).exec();

    const filter = {
      category: deleteId,
    };

    const updateSettings = {
      $set: { category: switchCategory._id },
    };

    await this.cascadeUpdateRelatives(filter, updateSettings);

    const images = Object.values(category.images).filter(
      item => typeof item === 'string' && item
    );

    if (images.length) {
      await uploadService.deleteFiles(images);
    }

    if (category) {
      return category;
    }

    throw new Error(CATEGORY_NOT_FOUND);
  }
  async getCategoriesWithModels() {
    const categories = await this.getAllCategories();
    return categories.map(category => {
      category.models = modelService.getModelsByCategory(category._id);
      return category;
    });
  }
  async checkCategoryExist(data, id) {
    if (!data.name.length) {
      return false;
    }
    const categoriesCount = await Category.countDocuments({
      _id: { $ne: id },
      name: {
        $elemMatch: {
          $or: data.name.map(({ value }) => ({ value })),
        },
      },
    }).exec();
    return categoriesCount > 0;
  }

  getCategoriesStats(categories, total) {
    let popularSum = 0;
    let res = { names: [], counts: [], relations: [] };

    categories
      .filter((_, idx) => idx < 3)
      .forEach(({ name, purchasedCount }) => {
        const relation = Math.round((purchasedCount * 100) / total);
        popularSum += relation;

        res.names.push(name[0].value);
        res.counts.push(purchasedCount);
        res.relations.push(relation);
      });

    const otherRelation = 100 - popularSum;
    const otherCount = Math.round((otherRelation * total) / 100);

    return {
      names: [...res.names, OTHERS],
      counts: [...res.counts, otherCount],
      relations: [...res.relations, otherRelation],
    };
  }

  async getPopularCategories() {
    let total = 0;
    const categories = await Category.find()
      .sort({ purchasedCount: -1 })
      .lean()
      .exec();

    categories.forEach(({ purchasedCount }) => (total += purchasedCount));

    return this.getCategoriesStats(categories, total);
  }
}

module.exports = new CategoryService();
