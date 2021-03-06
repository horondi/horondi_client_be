const mongoose = require('mongoose');
const Language = require('../../models/Language').schema;

const NewsSchema = new mongoose.Schema({
  title: [Language],
  text: [Language],
  image: String,
  author: {
    name: {
      type: Array,
      default: [
        {
          lang: 'uk',
          value: 'Горонді',
        },
        {
          lang: 'en',
          value: 'Horondi',
        },
      ],
    },
    image: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  show: Boolean,
  languages: [String],
});

module.exports = mongoose.model('News', NewsSchema);
