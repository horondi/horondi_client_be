const ConstructorBottom = require('./constructor-bottom.model');
const Material = require('../../material/material.service');
const {
  CONSTRUCTOR_BOTTOM_NOT_FOUND,
  IMAGE_NOT_FOUND,
  CONSTRUCTOR_BOTTOM_ALREADY_EXIST,
} = require('../../../error-messages/constructor-bottom.messages');
const uploadService = require('../../upload/upload.service');
const { calculatePrice } = require('../../currency/currency.utils');

class ConstructorBottomService {
  async getConstructorBottomById(id) {
    const constructorBottom = ConstructorBottom.findById(id).populate(
      'material'
    );
    if (!constructorBottom) {
      throw new Error(CONSTRUCTOR_BOTTOM_NOT_FOUND);
    }
    return constructorBottom;
  }

  async getAllConstructorBottom() {
    return await ConstructorBottom.find().populate('material');
  }

  async addConstructorBottom(data, upload) {
    if (await this.checkConstructorBottomExist(data)) {
      throw new Error(CONSTRUCTOR_BOTTOM_ALREADY_EXIST);
    }
    if (!upload) {
      throw new Error(IMAGE_NOT_FOUND);
    }
    const uploadResult = await uploadService.uploadFiles([upload]);
    const imageResults = await uploadResult[0];
    data.image = imageResults.fileNames;

    data.basePrice = await calculatePrice(data.basePrice);
    data.material = await Material.getMaterialById(data.material);
    return await new ConstructorBottom(data).save();
  }

  async updateConstructorBottom(id, newConstructorBottom, upload) {
    const constructorBottom = await ConstructorBottom.findById(id).populate(
      'material'
    );
    if (!constructorBottom) {
      throw new Error(CONSTRUCTOR_BOTTOM_NOT_FOUND);
    }

    if (upload) {
      if (constructorBottom.image) {
        await uploadService.deleteFiles([constructorBottom.image]);
      }
      const uploadResult = await uploadService.uploadFiles([upload]);
      const imageResults = await uploadResult[0];
      newConstructorBottom.image = imageResults.fileNames;
    }
    newConstructorBottom.basePrice = await calculatePrice(
      newConstructorBottom.basePrice
    );
    return ConstructorBottom.findByIdAndUpdate(id, newConstructorBottom, {
      new: true,
    });
  }

  async deleteConstructorBottom(id) {
    const constructorBottom = await ConstructorBottom.findByIdAndDelete(
      id
    ).populate('material');

    if (!constructorBottom) {
      throw new Error(CONSTRUCTOR_BOTTOM_NOT_FOUND);
    }

    if (constructorBottom.image) {
      uploadService.deleteFiles([constructorBottom.image]);
    }

    return constructorBottom;
  }

  async checkConstructorBottomExist(data) {
    let constructorBottomCount = await ConstructorBottom.countDocuments({
      name: {
        $elemMatch: {
          $or: data.name.map(({ value }) => ({ value })),
        },
      },
    });
    return constructorBottomCount > 0;
  }
}

module.exports = new ConstructorBottomService();
