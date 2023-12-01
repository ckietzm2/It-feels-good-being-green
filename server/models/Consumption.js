const { Schema, model } = require('mongoose');

const consumptionSchema = new Schema({
  userId: {
    type: Number,
    required: true,
    },
  electricity: {
      type: Number,
    },
  naturalGas: {
    type: Number,
  },
  gasoline: {
    type: Number,
  },
  food: {
    type: Number,
  },
});

const Consumption = model('Consumption', consumptionSchema);

module.exports = Consumption;
