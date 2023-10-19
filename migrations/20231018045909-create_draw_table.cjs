module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.createTable('Draws', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      prize_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Prizes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      draw_date: {
        type: Sequelize.DATE,
        allowNull: false,
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
      isRedeemed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },
  down: async function (queryInterface) {
    await queryInterface.dropTable('Draws');
  },
};
