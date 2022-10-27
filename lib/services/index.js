const { PopulateDatabase } = require('./populate-database');
const { ApproveStudents } = require('./approve-students');

const populateDatabase = new PopulateDatabase();
const approveStudents = new ApproveStudents();

module.exports = {
  populateDatabase,
  approveStudents
};
