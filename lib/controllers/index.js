const { PopulateController } = require('./populate');
const { ApproveController } = require('./approve');

const populateController = new PopulateController();
const approveController = new ApproveController();

module.exports = { populateController, approveController };
