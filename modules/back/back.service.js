const Back = require('./back.model');
const uploadService = require('../upload/upload.service');
const { calculatePrice } = require('../currency/currency.utils');
const RuleError = require('../../errors/rule.error');
const { BACK_NOT_FOUND } = require('../../consts/back-messages');
const {
  FILE_SIZES: { SMALL },
} = require('../../consts/file-sizes');
const {
  STATUS_CODES: { NOT_FOUND },
} = require('../../consts/status-codes');
const {
  HISTORY_ACTIONS: { ADD_BACK, EDIT_BACK, DELETE_BACK },
} = require('../../consts/history-actions');
const {
  generateHistoryObject,
  getChanges,
  generateHistoryChangesData,
} = require('../../utils/hisrory');
const { addHistoryRecord } = require('../history/history.service');
const {
  LANGUAGE_INDEX: { UA },
} = require('../../consts/languages');
const {
  HISTORY_OBJ_KEYS: {
    NAME,
    ADDITIONAL_PRICE,
    AVAILABLE,
    FEATURES,
    OPTION_TYPE,
    MODEL,
  },
} = require('../../consts/history-obj-keys');

class BackService {
  async getAllBacks(limit, skip, filter) {
    const filterOptions = {};

    if (filter.name) {
      const name = filter.name.trim();

      filterOptions.$or = [
        { 'name.value': { $regex: `${name}`, $options: 'i' } },
        { text: { $regex: `${name}`, $options: 'i' } },
      ];
    }

    if (filter.model.length) {
      filterOptions.model = { $in: filter.model };
    }

    if (filter.available) {
      filterOptions.available = { $in: filter.available };
    }

    if (filter.material.length) {
      filterOptions['features.material'] = { $in: filter.material };
    }

    if (filter.color.length) {
      filterOptions['features.color'] = { $in: filter.color };
    }

    const backs = await Back.find(filterOptions)
      .skip(skip)
      .limit(limit)
      .exec();

    const count = Back.countDocuments().exec();

    return {
      backs,
      count,
    };
  }

  async getBackById(id) {
    const foundBack = await Back.findById(id).exec();
    if (!foundBack) {
      throw new RuleError(BACK_NOT_FOUND, NOT_FOUND);
    }

    return foundBack;
  }

  async getBacksByModel(id) {
    const back = Back.find({ model: id }).exec();
    if (!back) {
      throw new RuleError(BACK_NOT_FOUND, NOT_FOUND);
    }

    return back;
  }

  async updateBack(id, back, image, { _id: adminId }) {
    const backToUpdate = await Back.findById(id).exec();

    if (!backToUpdate) {
      throw new RuleError(BACK_NOT_FOUND, NOT_FOUND);
    }

    if (image) {
      const uploadImage = await uploadService.uploadFile(image, [SMALL]);
      back.image = uploadImage.fileNames.small;
    }

    if (back.additionalPrice) {
      back.additionalPrice = await calculatePrice(back.additionalPrice);
    }

    const updatedBack = await Back.findByIdAndUpdate(id, back).exec();

    const { beforeChanges, afterChanges } = getChanges(backToUpdate, back);

    const historyRecord = generateHistoryObject(
      EDIT_BACK,
      backToUpdate.model?._id,
      backToUpdate.name[UA].value,
      backToUpdate._id,
      beforeChanges,
      afterChanges,
      adminId
    );

    await addHistoryRecord(historyRecord);

    return updatedBack;
  }

  async deleteBack(id, { _id: adminId }) {
    const foundBack = await Back.findById(id)
      .lean()
      .exec();

    if (!foundBack) {
      throw new RuleError(BACK_NOT_FOUND, NOT_FOUND);
    }

    const deletedImage = await uploadService.deleteFiles(
      Object.values(foundBack.image)
    );

    if (await Promise.allSettled(deletedImage)) {
      const historyRecord = generateHistoryObject(
        DELETE_BACK,
        foundBack.model,
        foundBack.name[UA].value,
        foundBack._id,
        generateHistoryChangesData(foundBack, [
          NAME,
          OPTION_TYPE,
          MODEL,
          FEATURES,
          AVAILABLE,
          ADDITIONAL_PRICE,
        ]),
        [],
        adminId
      );

      await addHistoryRecord(historyRecord);

      return Back.findByIdAndDelete(id);
    }
  }

  async addBack(back, image, { _id: adminId }) {
    if (image) {
      const uploadImage = await uploadService.uploadSmallImage(image);
      back.image = uploadImage.fileNames.small;
    }

    if (back.additionalPrice) {
      back.additionalPrice = await calculatePrice(back.additionalPrice);
    }

    const newBack = await new Back(back).save();

    const historyRecord = generateHistoryObject(
      ADD_BACK,
      newBack.model?._id,
      newBack.name[UA].value,
      newBack._id,
      [],
      generateHistoryChangesData(newBack, [
        NAME,
        OPTION_TYPE,
        MODEL,
        FEATURES,
        AVAILABLE,
        ADDITIONAL_PRICE,
      ]),
      adminId
    );

    await addHistoryRecord(historyRecord);

    return newBack;
  }
}

module.exports = new BackService();