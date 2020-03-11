const express = require('express');
const router = express.Router();

const user = require('./routes/user');
const contest = require('./routes/contest');

module.exports = () => {
    router.use('/user',user());
    router.use('/contest',contest());

    return router;
};