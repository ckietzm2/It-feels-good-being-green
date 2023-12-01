const { Schema, model } = require('mongoose');

const gasolineConsumptionSchema = new Schema({
  userId: {
    type: String,
    required: true,
    },
  gasoline: {
    gallons: {
      type: Number,
    },
    purchaseDate:{
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    }
  },
});

const GasolineConsumption = model('GasolineConsumption', gasolineConsumptionSchema);

module.exports = GasolineConsumption;
