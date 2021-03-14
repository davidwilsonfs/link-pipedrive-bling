import { Router } from 'express';
import * as pipedriveController from './pipedrive.controller';

const pipedriveRouter = Router();

/**
 * @swagger
 * /pipedrive:
 *   post:
 *     tags:
 *       - Pipedrive
 *     summary: teste
 *     description: teste
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
pipedriveRouter.post('/', pipedriveController.webhookPipedrive);

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
