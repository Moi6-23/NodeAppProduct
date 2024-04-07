const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')

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
    const newCustomer = await models.Customer.create(data, {
      include:['user']
    });
    return newCustomer;
  }

  async find() {
    const rta = await models.Customer.findAll({
      include: ['user']
    });
    console.log(rta)
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