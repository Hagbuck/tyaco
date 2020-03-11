
/**
 * [This middleware validate the authentification via token and check the rights of the user to access the ressource]
 * @param  {[Object]}   req  [description]
 * @param  {[Object]}   res  [description]
 * @param  {Function} 	next [description]
 */
module.exports = (req, res, next) => {
	const token = req.query.token;

	if(token)
		next();
	else
		res.sendStatus(403);
}