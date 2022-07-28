const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'минимальная длина имени — 2 символа'],
    maxlength: [30, 'максимальная длина имени — 30 символов'],
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    req: 'user',
    required: true,
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user', default: [] }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports.User = mongoose.model('card', cardSchema);
