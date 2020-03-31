const express     = require('express');
const mongoose    = require('mongoose');

const controllers = require('./api');
const config      = require('./config/config');

const logger = require('./services/logger');

async function startServer() {
    const app = express();

    await require('./loaders')(app);

    app.listen(config.port, err => {
      if (err) {
        Logger.error(err);
        process.exit(1);
        return;
      }
      logger.info(`Server listening on port: ${config.port}`);
    });
  }

startServer();
