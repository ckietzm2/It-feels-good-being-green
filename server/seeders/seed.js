const db = require('../config/connection');
const { User, ElectricCompany, Consumption } = require('../models');
const userSeeds = require('./userSeeds.json');
const energyBreakdownSeeds = require('./energyBreakdownSeeds.json');
const consumptionSeeds = require('./consumptionSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('ElectricCompany', 'electricCompany');
    await cleanDB('User', 'users');
    await cleanDB('Consumption', 'consumption')
    await User.create(userSeeds);
    await ElectricCompany.create(energyBreakdownSeeds);
    await Consumption.create(consumptionSeeds);

    for (let i = 0; i < consumptionSeeds.length; i++) {
      const { _id, userId } = await Consumption.create(consumptionSeeds[i])
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            consumption: _id,
          },
        }
      )

    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
