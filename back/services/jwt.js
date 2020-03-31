const jwt = require('jsonwebtoken');
const fs = require('fs')

const private_key      = fs.readFileSync('./keys/tyaco-private.pem', 'utf8');
const algo             = { algorithm: 'HS256'};
const token_validity_s = 86400; //60x60x24 = 24hours

module.exports = {
	create_token : (payload) => {
		/* Add an expiration date for the token */
		payload.exp = Math.floor(Date.now() / 1000) + token_validity_s;

		return jwt.sign(payload, private_key, algo);
	},

	decode_token : (token) => {
		return jwt.verify(token, private_key, algo);
	}
}
