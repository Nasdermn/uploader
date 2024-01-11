const mongoose = require('mongoose');
const stickerSchema = new mongoose.Schema({
  position: {
    type: Number,
    minlength: 1,
    maxlength: 1,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('sticker', stickerSchema);
