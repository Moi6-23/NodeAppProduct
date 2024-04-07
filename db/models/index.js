const {
  UserSchema,
  User
} = require('./user.model');

const {
  CustomerSchema,
  Customer
} = require('./customer.model');

const {
  Categories,
  categorySchema
} = require('./category.model');

const {
  Products,
  productsSchema
} = require('./product.model');

const {
  Order,
  ordersSchema
} = require('./order.model');

const {
  OrderProduct,
  ordersProductSchema
} = require('./order-product.model');



function setupModels(sequelize) {
  // Se recibe el schema y la configuración del modelo con la conexión
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Products.init(productsSchema, Products.config(sequelize));
  Categories.init(categorySchema, Categories.config(sequelize));
  Order.init(ordersSchema, Order.config(sequelize));
  OrderProduct.init(ordersProductSchema, OrderProduct.config(sequelize));
  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Categories.associate(sequelize.models);
  Products.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;