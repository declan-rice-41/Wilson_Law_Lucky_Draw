module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable('Prizes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      totalQuota: {
        type: Sequelize.INTEGER,
      },
      dailyQuota: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      probability: {
        allowNull: false,
        type: Sequelize.FLOAT,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: async function (queryInterface) {
    await queryInterface.dropTable('Prizes');
  },
};
