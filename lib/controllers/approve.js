const service = require('../services');

class ApproveController {
  async handle(req, res) {
    try {
      const { success } = await service.approveStudents.handle();

      return res.status(201).send({ success });
    } catch (error) {
      console.error(
        'Error executing #handle on ApproveController. ErrorMessage: %s', JSON.stringify(error, ['message', 'stack'])
      );

      return res.status(500).send({ error: error.message });
    }
  }
}

module.exports = { ApproveController };
