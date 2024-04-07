const Joi = require('joi');

const customerId = Joi.number().integer();
const id = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);


const getCustomerSchema = Joi.object({
  id: id.required()
})

const createOrderSchema = Joi.object({
  customerId: customerId.required()
})

const addItemSchema = Joi.object({
  productId: productId.required(),
  orderId: orderId.required(),
  amount: amount.required()
})

module.exports = {
  getCustomerSchema,
  createOrderSchema,
  addItemSchema
}