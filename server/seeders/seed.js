const db = require('../config/connection');
const { User, ElectricCompany, Consumption } = require('../models');
const energyBreakdownSeeds = require('./energyBreakdownSeeds.json')
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('ElectricCompany', 'electricCompany');
    await cleanDB('User', 'users');
    await cleanDB('Consumption', 'consumption')
    await User.create(userSeeds);
    await ElectricCompany.create(energyBreakdownSeeds);

    for (let i = 0; i < energyBreakdownSeeds.length; i++) {
      const { _id, companyName } = await ElectricCompany.create(energyBreakdownSeeds[i]);
    }
    
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
