const user = require('./schemas/user');

module.exports = {
    "/api/user/register" : user.register,
    "/api/user/connexion": user.connexion
};
