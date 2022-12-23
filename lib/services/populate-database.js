const chance = require('chance').Chance();
const db = require('../commons/database')

class PopulateDatabase {
  handle({ quantity }) {
    const classMates = this._buildDataToInsert(quantity);

    db.getCollection('classRoom').insertMany(classMates, (err) => {
      if (err) {
        throw error;
      }
    });
    
    return { success: true };
  }

  _buildDataToInsert(quantity) {
    let classMates = [];

    for (let i = 0; i <= quantity; i++) {
      let students = {
        name: chance.name(),
        age: chance.age({ type: 'teen' }),
        gender: chance.gender(),
        cpf: chance.cpf(),
        email: chance.email(),
        characteristics: {
          height: chance.integer({ min: 100, max: 180 }),
          weight: chance.integer({ min: 50, max: 90 }),
          hairColor: chance.color(),
          eyeColor: chance.color()
        },
        subjectsApproved: {
          math: chance.bool(),
          english: chance.bool(),
          physical: chance.bool(),
          chemistry: chance.bool()
        }
      };

      classMates.push(students);
    }

    return classMates;
  }
}

module.exports = { PopulateDatabase };
