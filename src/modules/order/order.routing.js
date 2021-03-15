import { Router } from 'express';
import orderController from './order.controller';
const ordersRouter = Router();

/**
 * @swagger
 * /orders/opportunities:
 *   get:
 *     tags:
 *       - Orders
 *     summary: teste
 *     description: teste
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 */
ordersRouter.get('/opportunities', orderController.getOpportunities);

export default ordersRouter;
