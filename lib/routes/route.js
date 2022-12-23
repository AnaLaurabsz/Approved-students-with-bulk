const { populateController } = require('../controllers');

module.exports = (router) => {
  router.post('/populate', (req, res) => populateController.handle(req, res));
};
