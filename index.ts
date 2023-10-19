import express, { Request, Response, NextFunction } from 'express';
import { drawController } from './controllers/drawController';
import { redeemController } from './controllers/redeemController';
import swaggerDocs from './utils/swagger';

const app = express();
const port = process.env.SERVER_PORT || '3000';

app.use(express.json());

/**
 * @openapi
 * /draw:
 *  get:
 *     tags:
 *     - Draw
 *     description: Responds if user is drawing
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              mobile:
 *                type: string
 *     responses:
 *       200:
 *         description: Draw Successfully
 */
app.post('/draw', drawController);

/**
 * @openapi
 * /redeem:
 *  post:
 *    tags:
 *      - Redeem
 *    description: Responds if the user is redeeming
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              mobile:
 *                type: string
 *    responses:
 *      200:
 *        description: Redeem Successfully
 */
app.post('/redeem', redeemController);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  swaggerDocs(app, parseInt(port));
});
