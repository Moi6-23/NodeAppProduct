const Joi = require('joi');

const id = Joi.number().integer();
const idUser = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const lastName = Joi.string().min(3).max(15);
const phone = Joi.string().min(8).max(15);
const email = Joi.string().email();
const password = Joi.string().min(3);

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  })
});
const createCustomerIdSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: idUser.required()
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: idUser.required()

});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, createCustomerIdSchema, updateCustomerSchema, getCustomerSchema }
