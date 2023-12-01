const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const companySchema = new Schema({
  companyName: {
    type: String,
  },
  sourceBreakdown: {
    coal: {
      type: Number
    },
    hydro: {
      type: Number
    },
    naturalGas: {
      type: Number
    },
    nuclear: {
      type: Number
    },
    nuclearOther: {
      type: Number
    },
    oil: {
      type: Number
    },
    other: {
      type: Number
    },
    renewables: {
      type: Number
    },
    solar: {
      type: Number
    },
    wind: {
      type: Number
    },
},
  dataSource: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const ElectricCompany = model('ElectricCompany', companySchema);

module.exports = ElectricCompany;
