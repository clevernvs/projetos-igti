import express from 'express';
import * as transactionService from '../services/transactionService.js';
import { logger } from '../config/logger.js';

const transactionRouter = express.Router();

transactionRouter.get('/', transactionService.index);
transactionRouter.get('/periods', transactionService.periodsList);
transactionRouter.put('/:id', transactionService.update);
transactionRouter.post('/', transactionService.create);
transactionRouter.delete('/:id', transactionService.remove);

transactionRouter.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});
export default transactionRouter;