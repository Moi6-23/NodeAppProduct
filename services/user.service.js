const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')
const bcrypt = require('bcrypt');

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
    const hash = await bcrypt.hash(data?.password, 10);
    const newUser = await models.User.create({
      ...data, password: hash
    });
    delete newUser.dataValues.password;
    return newUser;

  }
  async findByEmail(email) {
    const userEmail = await models.User.findOne({
      where: { email: email },
    });
    return userEmail;
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
