const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const orderSchema = new Schema({
  lunches: [{
    protein: {
      type: String,
      required: true,
    },
    drink: {

      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',

  },
}, {
  timestamps: true,
  versionKey: false,
});

const Order = mongoose.model('Order', orderSchema, 'Orders');

module.exports = Order;
