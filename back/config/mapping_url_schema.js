const user = require('./schemas/user');

module.exports = {
    "/user/register" : user.register,
    "/user/connexion": user.connexion
};
