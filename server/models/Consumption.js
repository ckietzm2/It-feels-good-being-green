const { Schema, model } = require('mongoose');

const consumptionSchema = new Schema({
  userId: {
    type: String,
    required: true,
    },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  endDate: {
    type: Date,
    required: true,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
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
