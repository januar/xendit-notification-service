'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Banks', [{
      name: 'BCA',
      code: 'bca',
      merchant_code : '7007015',
      created_at: new Date(),
      updated_at: new Date()
    },
      {
        name: 'BNI',
        code: 'bni',
        merchant_code : '8808',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'BRI',
        code: 'bri',
        merchant_code : '26215',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Bank Mandiri',
        code: 'mandiri',
        merchant_code : '88608',
        created_at: new Date(),
        updated_at: new Date()
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Banks', null, {});
  }
};
