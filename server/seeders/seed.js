const db = require('../config/connection');
const { User, ElectricCompany, ElectricConsumption, NaturalGasConsumption, GasolineConsumption } = require('../models');
const userSeeds = require('./userSeeds.json');
const energyBreakdownSeeds = require('./energyBreakdownSeeds.json');
const electricConsumptionSeeds = require('./electricConsumptionSeeds.json');
const naturalGasConsumptionSeeds = require('./naturalGasConsumptionSeeds.json');
const gasolineConsumptionSeeds = require('./gasolineConsumptionSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('ElectricCompany', 'electricCompany');
    await cleanDB('User', 'users');
    await cleanDB('ElectricConsumption', 'electricConsumption');
    await cleanDB('NaturalGasConsumption', 'naturalGasConsumption');
    await cleanDB('GasolineConsumption', 'gasolineConsumption');
    await User.create(userSeeds);
    await ElectricCompany.create(energyBreakdownSeeds);
    await ElectricConsumption.create(electricConsumptionSeeds);
    await NaturalGasConsumption.create(naturalGasConsumptionSeeds);
    await GasolineConsumption.create(gasolineConsumptionSeeds);
//attach electric consumption to user
    for (let i = 0; i < electricConsumptionSeeds.length; i++) {
      const { _id, userId } = await ElectricConsumption.create(electricConsumptionSeeds[i])
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            electricConsumption: _id,
          },
        }
      )
    }
//attach natural gas consumption to user
    for (let i = 0; i < naturalGasConsumptionSeeds.length; i++) {
      const { _id, userId } = await NaturalGasConsumption.create(naturalGasConsumptionSeeds[i])
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            naturalGasConsumption: _id,
          },
        }
      )
    }
//attach gasoline consumption to user
    for (let i = 0; i < gasolineConsumptionSeeds.length; i++) {
      const { _id, userId } = await GasolineConsumption.create(gasolineConsumptionSeeds[i])
      const user = await User.findOneAndUpdate(
        { _id: userId },
        {
          $addToSet: {
            gasolineConsumption: _id,
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
