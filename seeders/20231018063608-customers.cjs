async function up(queryInterface) {
  const mockCustomers = [
    {
      name: 'Wilson Law',
      mobile_number: '12345678',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Kenneth Chan',
      mobile_number: '87654321',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'Oscar Lau',
      mobile_number: '88888888',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  await queryInterface.bulkInsert('Customers', mockCustomers);
}

async function down(queryInterface) {
  await queryInterface.bulkDelete('Customers');
}

module.exports = {
  up,
  down,
};
