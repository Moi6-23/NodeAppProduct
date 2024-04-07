const { Model, DataTypes, Sequelize } = require('sequelize');
const CATEGORY_TABLE = 'categories';

const categorySchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  image:{
    type:DataTypes.STRING,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
}

class Categories extends Model {
  static associate(models) {
    this.hasMany(models.Products, {
      as: 'products',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'Categories',
      timestamps: false
    }
  }
}

module.exports = {
  categorySchema,
  CATEGORY_TABLE,
  Categories
}