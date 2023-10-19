async function up(queryInterface) {
  /**
   * Caveat: when the totalQuota/dailyQuota is unlimited/not available, it is marked as -1
   */
  const mockPrizes = [
    {
      id: 1,
      name: '$5 Cash Coupon',
      totalQuota: 500,
      dailyQuota: 100,
      probability: 0.005,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 2,
      name: '$2 Cash Coupon',
      totalQuota: 5000,
      dailyQuota: 500,
      probability: 0.02,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: 'Buy 1 Get 1 Free Coupon',
      totalQuota: -1,
      dailyQuota: -1,
      probability: 0.8,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: 'No Prize',
      totalQuota: -1,
      dailyQuota: -1,
      probability: 0.175,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await queryInterface.bulkInsert('Prizes', mockPrizes);
}
async function down(queryInterface) {
  await queryInterface.bulkDelete('Prizes');
}

module.exports = {
  up,
  down,
};
