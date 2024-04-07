'use strict';
const {ORDER_PODUCT_TABLE, ordersProductSchema} = require('./../models/order-product.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_PODUCT_TABLE, ordersProductSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_PODUCT_TABLE, ordersProductSchema)
  }
};
