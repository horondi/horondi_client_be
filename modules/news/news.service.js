const News = require('./news.model');
const {
  NEWS_ALREADY_EXIST,
  NEWS_NOT_FOUND,
} = require('../../error-messages/news.messages');

class NewsService {
  async getAllNews() {
    return await News.find();
  }

  async getNewsById(id) {
    const foundNews = await News.findById(id);
    if (foundNews) {
      return foundNews;
    }
    throw new Error(NEWS_NOT_FOUND);
  }

  async updateNews(id, news) {
    const foundNews = await News.findByIdAndUpdate(id, news, { new: true });
    if (foundNews) {
      return foundNews;
    }
    throw new Error(NEWS_NOT_FOUND);
  }

  async addNews(data) {
    if (await this.checkNewsExist(data)) {
      throw new Error(NEWS_ALREADY_EXIST);
    }
    return new News(data).save();
  }

  async deleteNews(id) {
    const foundNews = await News.findByIdAndDelete(id);
    if (foundNews) {
      return foundNews;
    }
    throw new Error(NEWS_NOT_FOUND);
  }

  async checkNewsExist(data) {
    const newsCount = await News.countDocuments({
      title: {
        $elemMatch: {
          $or: [{ value: data.title[0].value }, { value: data.title[1].value }],
        },
      },
    });
    return newsCount > 0;
  }
}
module.exports = new NewsService();
