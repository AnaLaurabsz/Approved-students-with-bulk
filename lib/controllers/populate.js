const service = require('../services');

class PopulateController {
  handle(req, res) {
    const { quantity } = req.body;

    try {
      const { success } = service.populateDatabase.handle({ quantity });

      return res.status(201).send({ success });
    } catch (error) {
      console.error(
        'Error executing #handle on PopulateController. ErrorMessage: %s', JSON.stringify(error, ['message', 'stack'])
      );

      return res.status(500).send({ error: error.message });
    }
  }
}

module.exports = { PopulateController };
