import { Router } from 'express';
import pipedriveWebhooks from '../../modules/pipedrive/pipedrive.webhooks';
import authentication from '../security/auth-strategy.security';
const webhooksRouters = Router();

/**
 * @swagger
 * /pipedrive/deals:
 *   post:
 *     tags:
 *       - Webhooks
 *     summary: handle deals from pipedrive
 *     description: handle event deals from pipedrive through you webhook
 *     security:
 *       - BasicAuth: []
 *
 *     parameters:
 *       - name: deal
 *         description: deal object
 *         in:  body
 *         schema:
 *           $ref: '#/definitions/Deal'
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 */
webhooksRouters.post(
  '/pipedrive/deals',
  authentication.basicAuthentication,
  pipedriveWebhooks.dealsEventHandler
);

/**
 * @swagger
 *
 * definitions:
 *   Deal:
 *     type: object
 *     properties:
 *       teste:
 */

export default webhooksRouters;
