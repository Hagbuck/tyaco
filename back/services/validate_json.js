const Validator = require('jsonschema').Validator;
const v         = new Validator();
const schemap   = require('../config/mapping_url_schema');

module.exports = (api_entry, json_in) => {
  return v.validate(json_in, schemap[api_entry]);
}
