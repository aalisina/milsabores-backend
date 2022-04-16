const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const menuSchema = new Schema({

  proteins: {
    type: Array,
    required: true,
  },
  drinks: {

    type: Array,
    required: true,
  },
  soup_fruit: {
    type: Array,
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
