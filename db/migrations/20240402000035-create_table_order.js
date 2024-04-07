'use strict';
const {ORDER_TABLE, ordersSchema} = require('./../models/order.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(ORDER_TABLE, ordersSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(ORDER_TABLE, ordersSchema)

  }
};
