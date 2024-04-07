const boom = require('@hapi/boom');
const {models} = require('../libs/sequelize')

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategories = await models.Categories.create(data);
    return newCategories;
  }

  async find() {
    const rta = await models.Categories.findAll({
      include: ['products']
    });
    console.log(rta)
    return rta;
  }

  async findOne(id) {
    const curstomer = await models.Categories.findByPk(id);
    if(!curstomer){
      throw boom.notFound('Categories not found');
    }
    return curstomer;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    const Categories = await this.findOne(id);
    const resp = await Categories.destroy();
    console.log(resp)
    let respMessaje = {
      message: 'Se ha eliminado correctamente',
      id: 1,
      email: Categories.name
    }
    return {...respMessaje};
  }

}

module.exports = CategoryService;
