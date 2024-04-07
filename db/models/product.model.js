const { Model, DataTypes, Sequelize } = require('sequelize');
const PRODUCT_TABLE = 'products';
const {CATEGORY_TABLE} = require('./category.model');

const productsSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  image:{
    type:DataTypes.STRING,
    allowNull: false
  },
  description:{
    type:DataTypes.STRING,
    allowNull: false
  },
  precio:{
    type:DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
  categoryId:{
    field:'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CATEGORY_TABLE,
      key:'id'
    },
    onUpdate:'CASCADE',
    onDelete:'SET NULL'
  }
}

class Products extends Model {
  static associate(models) {
    this.belongsTo(models.Categories,{
      as: 'category',
      foreignKey: 'categoryId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'Products',
      timestamps: false
    }
  }
}

module.exports = {
  productsSchema,
  PRODUCT_TABLE,
  Products
}