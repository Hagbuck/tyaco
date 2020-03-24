
module.exports = (model, id) => {
	return new Promise( (resolve, reject) => {
		model.exists( { _id : id } )
		.then( (exists) => {
			resolve(exists);
		})
		.catch( (err) => {
			reject(err);
		})
	});
}
