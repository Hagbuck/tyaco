const Validator = require('jsonschema').Validator;
const v         = new Validator();
const schemap   = require('../config/mapping_url_schema');

function validate_json(api_entry, json_in){
  if(schemap[api_entry])
    return v.validate(json_in, schemap[api_entry]);
  return {errors:[]};
}

module.exports = (req, res, next) => {
  const r = validate_json(req.path, req.body);

  if(r.errors.length == 0) next();
  else res.status(400).json(r.errors);
}
