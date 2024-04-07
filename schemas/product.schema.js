const Joi = require('joi');

const categoryId = Joi.number().integer();
const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer();
const image = Joi.string().uri();
const descripcion = Joi.string().min(10);
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();


const createProductSchema = Joi.object({
  name: name.required(),
  precio: price.required(),
  image: image.required(),
  description: descripcion.required(),
  categoryId: categoryId
});

const updateProductSchema = Joi.object({
  name: name,
  precio: price,
  image: image,
  description: descripcion
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: price_min.required(),
    then: Joi.required(),
  })
})


module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
