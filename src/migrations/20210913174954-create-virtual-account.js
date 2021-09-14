'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('VirtualAccounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      merchant_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Merchants",
          key : "id"
        },
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
      },
      bank_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Banks",
          key : "id"
        }
      },
      external_id: {
        type: Sequelize.STRING
      },
      account_number: {
        type: Sequelize.STRING
      },
      bank_code: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('VirtualAccounts');
  }
};