const { PopulateDatabase } = require('./populate-database');
const  approveStudents  = require('./approve-students');

const populateDatabase = new PopulateDatabase();


module.exports = {
  populateDatabase,
  approveStudents
};
