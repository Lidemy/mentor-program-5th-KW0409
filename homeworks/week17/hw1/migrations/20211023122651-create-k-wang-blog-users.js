/* eslint-disable */
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('KWang_blog_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickname: {
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(64)
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(128)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('KWang_blog_users');
  }
};