const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {

  constructor() {
  }
  async create(data) {
    const newOrders = await models.Order.create(data);
    return newOrders;
  }

  async find() {
    const rta = await models.Order.findAll();
    return rta;
  }

  async findOne(id) {
    const orderData = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include:['user']
        },
        'items'
      ]
    });
    if (!orderData) {
      throw boom.notFound('orden not found');
    }
    return orderData;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    const orders = await this.findOne(id);
    const resp = await orders.destroy();
    console.log(resp)
    let respMessaje = {
      message: 'Se ha eliminado correctamente',
      id: 1,
      email: orders.name
    }
    return { ...respMessaje };
  }

  async addItem(dataItem){
    const itemCreate = await models.OrderProduct.create(dataItem);
    return itemCreate;
  }

  async findByUser(userId){
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$':userId
      },
      include: [
        {
          association: 'customer',
          include:['user']
        },
        'items'
      ]
    })
    if (orders.length === 0) {
      throw boom.notFound('No tiene ordenes');
    }
    return orders
  }

}

module.exports = OrderService;
