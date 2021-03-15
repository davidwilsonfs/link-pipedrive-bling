import { Router } from 'express';
import * as pipedriveController from './pipedrive.controller';
import { basicAuthentication } from '../../core/security/auth-strategy.security';
const pipedriveRouter = Router();

/**
 * @swagger
 * /pipedrive:
 *   post:
 *     tags:
 *       - Pipedrive
 *     summary: teste
 *     description: teste
 *     security:
 *       - BasicAuth: []
 *     parameters:
 *       - name: pipedrive
 *         description: pipedrive object
 *         in:  body
 *         schema:
 *           $ref: '#/definitions/Pipedrive'
 *     responses:
 *       201:
 *         description: Created
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad Request
 */
pipedriveRouter.post('/', basicAuthentication, pipedriveController.webhookPipedrive);

/**
 * @swagger
 * /pipedrive/opportunities:
 *   get:
 *     tags:
 *       - Pipedrive
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
pipedriveRouter.get('/opportunities', pipedriveController.getOpportunities);

/**
 * @swagger
 *
 * definitions:
 *   Pipedrive:
 *     type: object
 *     properties:
 *       teste:
 */

export default pipedriveRouter;
