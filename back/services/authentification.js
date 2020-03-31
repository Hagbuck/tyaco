const jwt    = require('./jwt');
const logger = require('./logger');

/**
 * [This middleware validate the authentification via token and check the rights of the user to access the ressource]
 */
module.exports = (req, res, next) => {

	let logger_msg = `[${req.method}](${req.path})`;

	if(req.path == '/user/connexion'
	|| req.path == '/user/register'){
		logger.debug(logger_msg);
		next();
	} else {

		const token = req.headers.token;

		if(!token){
			logger.debug(logger_msg + ' : No token found');
			return res.status(401).json({error: "Please insert a token into the headers. To obtain your token, please login at /api/user/connexion. "});
		}

		try{

			res.locals.decoded_token = jwt.decode_token(token);
			logger.debug(logger_msg + ' by ' + res.locals.decoded_token.username);
			next();

		} catch (err){
			logger.debug(logger_msg + ' : Token provided is unvalaible');
			return res.status(401).json(err);
		}
	}
}
