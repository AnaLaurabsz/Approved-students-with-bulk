const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { route } = require('../routes');
const config = require('../conf');
const pkg = require('../../package.json');

const server = (() => {
  const router = new express.Router();
  const app = express();
  const env = process.env.NODE_ENV;
  let serverProcess;

    const configServer = () => {
    route(router);

    app.set('port', config.get('PORT'));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use('/', router);

    return app;
  };

    const start = () => new Promise((resolve) => {
    configServer();
    serverProcess = app.listen(app.get('port'), () => {
      console.info(`listening on port: ${serverProcess.address().port}`);

      return resolve(app);
    });
  });

  const stop = () => new Promise((resolve, reject) => {
    if (serverProcess) {
      serverProcess.close((err) => {
        if (err) {
          return reject(err);
        }
        return resolve();
      });
    }
  });

  return {
    configServer,
    start,
    stop
  };
})();

module.exports = server;
