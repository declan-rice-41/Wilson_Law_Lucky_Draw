import Draw from '../modal/Draw';
import Prize from '../modal/Prize';

export function checkIfDrawExists(customerId: number, drawDate: Date) {
  try {
    return Draw.findOne({
      where: {
        customer_id: customerId,
        draw_date: drawDate,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('err: checkIfDrawExists');
  }
}

export async function performRandomDraw() {
  try {
    const prizes = await Prize.findAll();
    const probabilities = prizes.map((prize) => prize.probability);
    const random = Math.random();

    let cumulativeProbability = 0;
    let selectedPrize: Prize | null = null;

    for (let i = 0; i < probabilities.length; i++) {
      cumulativeProbability += probabilities[i];
      if (random <= cumulativeProbability) {
        selectedPrize = prizes[i];
        break;
      }
    }
    return selectedPrize;
  } catch (error) {
    console.error(error);
    throw new Error('err: performRandomDraw');
  }
}

export function createDrawRecord(
  customerId: number,
  drawDate: Date,
  prizeId: number,
) {
  try {
    return Draw.create({
      customer_id: customerId,
      draw_date: drawDate,
      prize_id: prizeId,
      isRedeemed: false,
    });
  } catch (error) {
    console.error(error);
    throw new Error('err: createDrawRecord');
  }
}

export function checkIfDrawHasRedeemed(customerId: number, prizeId: number) {
  try {
    return Draw.findOne({
      where: {
        customer_id: customerId,
        prize_id: prizeId,
        isRedeemed: true,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error('err: checkIfDrawHasRedeemed');
  }
}
