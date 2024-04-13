const Joi = require('joi');

const token = Joi.string().min(30);
const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);

const sendAuthEmailSchema = Joi.object({
  email: email.required(),
});

const changePasswordSchema = Joi.object({
  token: token.required(),
  newPassword: password.required(),
});

module.exports = {changePasswordSchema, sendAuthEmailSchema};