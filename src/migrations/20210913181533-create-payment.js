'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      invoice_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Invoices",
          key : "id"
        }
      },
      uuid: {
        type: Sequelize.STRING
      },
      payment_date: {
        type: Sequelize.DATE
      },
      notification_status: {
        type: Sequelize.INTEGER
      },
      notification_sending: {
        type: Sequelize.INTEGER
      },
      last_send: {
        type: Sequelize.DATE,
        allowNull: true
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
    await queryInterface.dropTable('Payments');
  }
};