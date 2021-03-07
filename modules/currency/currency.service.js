const Currency = require('./currency.model');

const {
  CURRENCY_ALREADY_EXIST,
  CURRENCY_NOT_FOUND,
} = require('../../error-messages/currency.messages');
const {
  CURRENCY: { UAH, USD },
} = require('../../consts/currency');

class CurrencyService {
  constructor() {
    this.currencyTypes = {
      UAH: UAH,
      USD: USD,
    };
  }

  async getAllCurrencies() {
    return await Currency.find().exec();
  }

  async getCurrencyById(id) {
    const foundCurrency = await Currency.findById(id).exec();
    if (foundCurrency) {
      return foundCurrency;
    }
    throw new Error(CURRENCY_NOT_FOUND);
  }

  async updateCurrency(id, currency) {
    const currencyToUpdate = await Currency.findById(id).exec();
    if (!currencyToUpdate) {
      throw new Error(CURRENCY_NOT_FOUND);
    }
    if (await this.checkCurrencyExist(currency, id)) {
      throw new Error(CURRENCY_ALREADY_EXIST);
    }
    return await Currency.findByIdAndUpdate(id, currency, {
      new: true,
    }).exec();
  }

  async addCurrency(data) {
    if (await this.checkCurrencyExist(data)) {
      throw new Error(CURRENCY_ALREADY_EXIST);
    }
    return new Currency(data).save();
  }

  async deleteCurrency(id) {
    const foundCurrency = await Currency.findByIdAndDelete(id).exec();
    if (foundCurrency) {
      return foundCurrency;
    }
    throw new Error(CURRENCY_NOT_FOUND);
  }

  async deleteAllCurrencies() {
    await Currency.deleteMany({}).exec();
  }

  async checkCurrencyExist(data, id) {
    const currenciesCount = await Currency.countDocuments({
      _id: { $ne: id },
      convertOptions: {
        $elemMatch: {
          $or: [
            { name: data.convertOptions[0].name },
            { name: data.convertOptions[1].name },
          ],
        },
      },
    }).exec();
    return currenciesCount > 0;
  }
}
module.exports = new CurrencyService();
