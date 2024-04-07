const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres')
const pool = require('../libs/postgres.pool')
const {models} = require('../libs/sequelize')

class UserService {
  constructor() {
 }

  async create(data) {
    const emailExist = await models.User.findOne({
      where: { email: data.email },
    });
    if (emailExist) {
      throw boom.badData('duplicated unique email');
    }
    const newUser = await models.User.create(data);
    console.log('Método create - UserService')
    console.log(newUser)
    return newUser;

  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    console.log(rta)
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id, {
      include: ['customer']
    });
    if(!user){
      throw boom.notFound('User not found');
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const resp = await user.update(changes);
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    const user = await this.findOne(id);
    const resp = await user.destroy();
    console.log(resp)
    let respMessaje = {
      message: 'Se ha eliminado correctamente',
      id: 1,
      email: user.email
    }
    return {...respMessaje};
  }
}

module.exports = UserService;
