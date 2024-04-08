const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {
 }

  async create(data) {
    const nameExist = await models.Customer.findOne({
      where: { name: data.name },
    });
    if (nameExist) {
      throw boom.badData('duplicated unique email');
    }
    const hash = await bcrypt.hash(data.user.password, 10);
    let dataHash = {
      ...data,
      user:{
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(dataHash, {
      include:['user']
    });
    let path = newCustomer.dataValues.user;
    delete path.dataValues.password
    return newCustomer;
  }

  async createWithId(data) {
    const nameExist = await models.Customer.findOne({
      where: { name: data.name },
    });
    if (nameExist) {
      throw boom.badData('duplicated unique name');
    }

    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: [{
        model: models.User,
        as: 'user',
        attributes: {
          exclude: ['password']
        }
      }],
    });
    return rta;
  }

  async findOne(id) {
    const curstomer = await models.Customer.findByPk(id);
    if(!curstomer){
      throw boom.notFound('Customer not found');
    }
    return curstomer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const resp = await customer.update(changes);
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    const customer = await this.findOne(id);
    const resp = await customer.destroy();
    console.log(resp)
    let respMessaje = {
      message: 'Se ha eliminado correctamente',
      id: 1,
      email: customer.name
    }
    return {...respMessaje};
  }
}

module.exports = CustomerService;