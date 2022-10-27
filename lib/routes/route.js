const { populateController, approveController } = require('../controllers');

module.exports = (router) => {
  router.post('/populate', (req, res) => populateController.handle(req, res));
  router.post('/approve', (req, res) => approveController.handle(req, res));
};
