import { Request, Response } from 'express';
import {
  findLatestDrawByCustomerId,
  findPrizeById,
  getTotalDailyRedeemedDrawCount,
  getTotalRedeemedDrawCount,
} from '../services/redeemService';
import { findCustomerByMobileNumber } from '../services/customerService';
import { checkIfDrawHasRedeemed } from '../services/drawService';

export async function redeemController(req: Request, res: Response) {
  const { mobile } = req.body;
  try {
    const customer = await findCustomerByMobileNumber(mobile);
    if (!customer) return res.status(400).json({ message: 'No customer.' });

    const latestDraw = await findLatestDrawByCustomerId(customer.id);

    if (!latestDraw)
      return res.status(400).json({ message: 'You have not drawn.' });

    if (latestDraw.prize_id === 4)
      return res.status(400).json({ message: 'You have no prize to redeem' });

    if (latestDraw.isRedeemed)
      return res.status(400).json({ message: 'You have already redeemed.' });

    if (latestDraw.prize_id !== 4) {
      const hasRedeemed = await checkIfDrawHasRedeemed(
        customer.id,
        latestDraw.prize_id,
      );
      if (hasRedeemed)
        return res
          .status(400)
          .json({ message: 'You have redeemed this prize once before.' });
      latestDraw.isRedeemed = true;
      await latestDraw.save();
    }

    const prize = await findPrizeById(latestDraw.prize_id);
    if (!prize)
      return res.status(400).json({ message: 'You have won no prize.' });

    if (prize.totalQuota !== -1) {
      const totalDailyRedeemedDrawCount = await getTotalDailyRedeemedDrawCount(
        latestDraw.prize_id,
      );
      const remainingDailyQuota =
        prize.totalQuota - totalDailyRedeemedDrawCount;

      if (remainingDailyQuota <= 0)
        return res.status(400).json({ message: 'Run out of daily quota' });

      const totalRedeemedDrawCount = await getTotalRedeemedDrawCount(
        latestDraw.prize_id,
      );
      const remainingTotalQuota = prize.totalQuota - totalRedeemedDrawCount;
      if (remainingTotalQuota <= 0)
        return res.status(400).json({ message: 'Run out of total quota' });
    }
    return res.json({ message: `Successfully redeemed ${prize.name}.` });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'An error occurred while performing redeem.' });
  }
}
