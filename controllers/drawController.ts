import { Request, Response } from 'express';
import {
  checkIfDrawExists,
  createDrawRecord,
  performRandomDraw,
} from '../services/drawService';
import { findCustomerByMobileNumber } from '../services/customerService';

export async function drawController(req: Request, res: Response) {
  const { mobile } = req.body;
  try {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);

    const customer = await findCustomerByMobileNumber(mobile);
    if (!customer) return res.status(400).json({ message: 'No customer.' });

    const isDrawExisted = await checkIfDrawExists(customer.id, today);
    if (isDrawExisted) {
      return res.status(400).json({
        message: 'You have already drawn today. Please draw tomorrow.',
      });
    }

    const selectedPrize = await performRandomDraw();
    if (!selectedPrize) return res.json({ message: 'You have won no prize.' });
    await createDrawRecord(customer.id, today, selectedPrize.id);
    /**@todo implement SMS logic */

    const isNoPrize = selectedPrize.name === 'No Prize';
    return res.json({
      message: `You have won ${selectedPrize.name}. ${
        isNoPrize ? 'Please join again tomorrow' : ''
      }`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: 'An error occurred while performing the lucky draw.' });
  }
}
