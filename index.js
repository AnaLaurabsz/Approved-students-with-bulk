const pkg = require('./package.json');
const server = require('./lib/server');
const db = require('./lib/commons/database');
const { pollingManager } = require('./lib/managers');
const { approveStudents } = require('./lib/services');
const { logger } = require('./lib/logger');

process.title = pkg.name;

const shutdown = async () => {
  logger.info('Gracefully shutdown in progress');
  await server.stop();
  await db.close();
  pollingManager.stopPolling();
  process.exit(0);
};

process
  .on('SIGTERM', shutdown)
  .on('SIGINT', shutdown)
  .on('SIGHUP', shutdown)
  .on('uncaughtException', (err) => {
    logger.error('uncaughtException caught the error: ', err);
    throw err;
  })
  .on('unhandledRejection', (err, promise) => {
    logger.error(`Unhandled Rejection at: Promise ${promise} reason: ${err}`);
    throw err;
  })
  .on('exit', (code) => {
    logger.info(`Node process exit with code: ${code}`);
  });

(async () => {
  const { approveService } = approveStudents;

  try {
    await db.connect();
    await server.start();
    pollingManager.startPolling(approveService);
  } catch (err) {
    logger.error('[APP] initialization failed', err);
    throw err;
  }
  logger.info('[APP] initialized SUCCESSFULLY');
})();
