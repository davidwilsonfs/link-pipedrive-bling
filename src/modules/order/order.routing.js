import { Router } from 'express';
import orderController from './order.controller';
import authentication from '../../core/security/auth-strategy.security';
const ordersRouter = Router();

/**
 * @swagger
 * /orders:
 *   get:
 *     tags:
 *       - Orders
 *     summary: Return all orders
 *     description: Return all orders by page and limit
 *     security:
 *       - BasicAuth: []
 *     parameters:
 *       - name: limit
 *         description: quantity of docs by page
 *         in: query
 *         required: false
 *         type: string
 *       - name: page
 *         description: docs page
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: list of all orders
 *       401:
 *         description: Unauthorized
 */
ordersRouter.get('/', authentication.basicAuthentication, orderController.getAll);

/**
 * @swagger
 * /orders/opportunities:
 *   get:
 *     tags:
 *       - Orders
 *     summary: aggregates the opportunities inserted in Bling by day and total value
 *     description: aggregates the opportunities inserted in Bling by day and total value
 *     security:
 *       - BasicAuth: []
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 */
ordersRouter.get(
  '/opportunities',
  authentication.basicAuthentication,
  orderController.getOpportunities
);

export default ordersRouter;
