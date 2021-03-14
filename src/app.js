import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import moment from 'moment';
import InitServer from './bin/www';
import InitSwagger from './config/boot/boot.swagger';
import InitDatabase from './config/boot/boot.database';
import ConfigApiRoutes from './config/boot/boot.routes';
import { initializerLogger } from './config/boot/boot.logger';
import ConfigErrorHandler from './core/exceptions/handler.error';
moment.locale('pt-br');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());

const server = InitServer(app);
initializerLogger(app);
InitSwagger(app);
InitDatabase();

ConfigApiRoutes(app);
ConfigErrorHandler(app);

export { app, server };
