const mongoose = require('mongoose');

const {
  TEXT_TOO_SHORT,
  TEXT_TOO_LONG,
} = require('../../error-messages/common.messages');
const {
  DB_COLLECTIONS_NAMES: { COMMENT, PRODUCT, USER },
} = require('../../consts/db-collections-names');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    minlength: [2, TEXT_TOO_SHORT],
    maxlength: [700, TEXT_TOO_LONG],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: USER,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: PRODUCT,
  },
  show: Boolean,
});

module.exports = mongoose.model(COMMENT, commentSchema);
