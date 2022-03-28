const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const menuSchema = new Schema({

  protein: {
    type: Array,
    required: true,
  },
  drink: {

    type: Array,
    required: true,
  },
  soup_fruit: {
    type: String,
    required: true,
  },
  sides: {
    type: Array,
    required: true,
  },

}, {
  timestamps: true,
  versionKey: false,
});

const Menu = mongoose.model('Menu', menuSchema, 'Menu');

module.exports = Menu;
