const conf = require('../conf'); // permite usar as variáveis de ambiente
const { logger } = require('../logger');

class PollingManager {// para approvedStudents
  constructor() {
    let polling;
    this.startPolling = (handlerFunction, isEmpty) => {
      let interval = conf.get('INITIAL_INTERVAL');

      if (isEmpty === true) {
        interval = conf.get('DELAY_INTERVAL');
      } // update depois..
      // isEmpty undefined pois esta iniciando o serviço

      polling = setInterval(handlerFunction, interval);

      logger.info(`${new Date().toISOString()} -
         ${handlerFunction.name} is running with ${interval}ms interval.`);
    };

    this.stopPolling = (error) => {
      if (error) {
        logger.log('Polling tryied to stop with error. %s',
          JSON.stringify(error, ['message', 'stack']));
      }
      clearInterval(polling);
    };

    this.updatePollingTimer = (handlerFunction, isEmpty) => {
      clearInterval(polling);
      this.startPolling(handlerFunction, isEmpty);
    };
  }
}

module.exports = { PollingManager };
