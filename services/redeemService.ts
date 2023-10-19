import Draw from '../modal/Draw';
import Prize from '../modal/Prize';

export async function findLatestDrawByCustomerId(customerId: number) {
  try {
    return await Draw.findOne({
      where: {
        customer_id: customerId,
      },
      order: [['created_at', 'DESC']],
    });
  } catch (error) {
    console.error(error);
    throw new Error('err: findLatestDrawByCustomerId');
  }
}

export async function findPrizeById(prizeId: number) {
  try {
    return await Prize.findOne({
      where: {
        id: prizeId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('err: findPrizeById ');
  }
}

export async function getTotalRedeemedDrawCount(prizeId: number) {
  try {
    return await Draw.count({
      where: {
        isRedeemed: true,
        prize_id: prizeId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('err: getTotalRedeemedDrawCount');
  }
}

export async function getTotalDailyRedeemedDrawCount(prizeId: number) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return await Draw.count({
      where: {
        isRedeemed: true,
        draw_date: today,
        prize_id: prizeId,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('err: getTotalDailyRedeemedDrawCount');
  }
}
