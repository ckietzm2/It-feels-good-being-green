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

    for (let i = 0; i < consumptionSeeds.length; i++) {
      const { _id, companyName } = await ElectricCompany.create(energyBreakdownSeeds[i]);
    }
    for (let i = 0; i < thoughtSeeds.length; i++) {
      const { _id, thoughtAuthor } = await Thought.create(thoughtSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: thoughtAuthor },
        {
          $addToSet: {
            thoughts: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
