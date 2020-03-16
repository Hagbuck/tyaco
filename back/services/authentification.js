
/**
 * [This middleware validate the authentification via token and check the rights of the user to access the ressource]
 */
module.exports = (req, res, next) => {
	const token = req.query.token;

	if(token)
		next();
	else
		res.sendStatus(401); // Should register or send token
}
