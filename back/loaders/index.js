const mongoose = require('mongoose');

const expressLoader  = require('./express');
const mongooseLoader = require('./mongoose');

const logger = require('../services/logger');

module.exports = async (app) => {

    await expressLoader(app);
    logger.info('Express loaded');

	// IF LOCAL RUNNING  -> localhost
	// IF DOCKER RUNNING -> tyaco_database
	// TODO : Use env variable
    let db = await mongooseLoader('tyaco_database');
    logger.info('MongoDB connection success');
};
