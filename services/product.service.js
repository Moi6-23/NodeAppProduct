const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');


class ProductsService {

  constructor() {
    this.products = [];
    this.generate();
  }

  async generate() {
    const limit = 100;
    for (let index = 0; index < Number(limit); index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock:faker.datatype.boolean(),
      })
    }
  }

  async create({ name, price }) {
    let newProduct = {
      id: faker.string.uuid(),
      name: name,
      price: parseInt(Number(price), 10),
      image: faker.image.url(), 
      isBlock:faker.datatype.boolean(),
    }
    this.products.push(newProduct)
    return newProduct;
  }

  async find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products)
      }, 2000)
    })
  }

  async findOne(uuid) {
    const product = this.products.find((produ) => produ.id === uuid);
    if(!product){
      throw boom.notFound('product not found')
    }
    if(product.isBlock){
      throw boom.conflict('Product is block')
    }

    return product;
  }

  async update(id, data) {
    const index = this.products.findIndex(objeto => objeto.id === id);
    if (index === -1) {
      throw boom.notFound('product not found')
    }
    const product = this.products[index];
    if (product.isBlock){
      throw boom.conflict("Product is Block");
    }
    this.products[index] = { ...this.products[index], ...data };
    return this.products[index];

    // if (index !== -1) {
    //     this.products[index] = { ...this.products[index], ...data };
    //     return 200;
    // } else {
    //     return 404;
    // }th
  }

  async delete1(id) {
    const idExists = this.products.some(prod => prod.id === id);
    if (idExists) {
      this.products = this.products.filter((prod) => prod.id !== id)
      return 200;
    } else {
      throw boom.notFound('product not found')
    }
  }
  // Más eficiente
  async delete2(id) {
    const index = this.products.findIndex(prod => prod.id === id);
    if (index === -1) {
      throw boom.notFound('product not found')
    }
    this.products.splice(index, 1);
    return {id}
  }

}

module.exports = ProductsService;