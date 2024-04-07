'use strict';
const {PRODUCT_TABLE, productsSchema} = require('./../models/product.model');
const {CATEGORY_TABLE, categorySchema} = require('./../models/category.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CATEGORY_TABLE, categorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, productsSchema);

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(PRODUCT_TABLE, productsSchema)
    await queryInterface.dropTable(CATEGORY_TABLE, categorySchema)

  }
};
