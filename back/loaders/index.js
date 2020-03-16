const expressLoader = require('./express');
const mongooseLoader = require('./mongoose');

const mongoose = require('mongoose');

module.exports = async (app) => {

    await expressLoader(app);
    console.log('[INFO] Express loaded');

    let db = await mongooseLoader();
    console.log('[INFO] MongoDB connection success');
};
