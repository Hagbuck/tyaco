const mongoose = require('mongoose');

const expressLoader  = require('./express');
const mongooseLoader = require('./mongoose');

const logger = require('../services/logger');

module.exports = async (app) => {

    await expressLoader(app);
    logger.info('Express loaded');

    let db = await mongooseLoader();
    logger.info('MongoDB connection success');
};
