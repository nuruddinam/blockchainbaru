const Ajv = require("ajv");
const { userSchema } = require("./dto/model");
const ajv = new Ajv();

const validateUserData = ajv.compile(userSchema);

module.exports = { validateUserData };
