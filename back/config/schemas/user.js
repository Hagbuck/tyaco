module.exports = {
  register : {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/product.schema.json",
    "title": "User",
    "description": "A TYACO User",
    "type": "object",

    "properties" : {
      "username" : {
        "type" : "string"
      },
      "password" : {
        "type" : "string"
      },
      "email" : {
        "type" : "string"
      },
      "firstname" : {
        "type" : "string"
      },
      "lastname" : {
        "type" : "string"
      },
    },

    "required" : ["username", "password", "email"],
    "additionalProperties" : false
  },

  connexion : {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "$id": "http://example.com/product.schema.json",
    "title": "User",
    "description": "A TYACO User",
    "type": "object",

    "properties" : {
      "username" : {
        "type" : "string"
      },
      "password" : {
        "type" : "string"
      }
    },

    "required" : ["username", "password"],
    "additionalProperties" : false
  }

};
