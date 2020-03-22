const express = require('express');
const router  = express.Router();

const user       = require('./routes/user');
const contest    = require('./routes/contest');
const constraint = require('./routes/constraint');
const submission = require('./routes/submission');
const comment    = require('./routes/comment');
const vote       = require('./routes/vote');

module.exports = () => {
    router.use('/user',user());
    router.use('/contest',contest());
    router.use('/constraint',constraint());
    router.use('/submission',submission());
    router.use('/comment',comment());
    router.use('/vote',vote());

    return router;
};
