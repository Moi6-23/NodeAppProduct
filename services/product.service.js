const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')
const {Op} = require('sequelize')
class ProductsService {

  constructor(){
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.products.push({
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        description: 'Producto faker',
        ca
      });
    }
  }

  async create(data) {
    const newProduct = await models.Products.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include:['category'],
      where:{}
    }
    const {limit, offset} = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    const {price} = query;

    if(price){
      options.where.precio = price;
    }

    const rta = await models.Products.findAll(options);
    console.log(rta)
    return rta;
  }

  async findBetween(query) {
    const options = {
      include:['category'],
      where:{}
    }

    const {price_min, price_max} = query;

    if(price_min && price_max){
      options.where.precio = {
        [Op.between]: [price_min, price_max],
      };
    }

    const rta = await models.Products.findAll(options);
    return rta;
  }

  async findOne(id) {
    const product = await models.Products.findByPk(id);
    if(!product){
      throw boom.notFound('Categories not found');
    }
    return product;
  }

  async update(id, changes) {
    const index = this.products.findIndex(item => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...changes
    };
    return this.products[index];
  }

  async delete(id) {
    const product = await this.findOne(id);
    const resp = await product.destroy();
    console.log(resp)
    let respMessaje = {
      message: 'Se ha eliminado correctamente',
      id: 1,
      email: Categories.name
    }
    return {...respMessaje};
  }

}

module.exports = ProductsService;
