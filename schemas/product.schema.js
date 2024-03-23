const Joi = require('joi');

const id = Joi.string().guid({
  version: [
    'uuidv4',
    'uuidv5'
  ]
});

const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const isBlock = Joi.boolean();
const image = Joi.string().uri();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required()
})

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  isBlock: isBlock,
  image: image
})

const getProductSchema = Joi.object({
  id: id.required(),
})

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema
}

