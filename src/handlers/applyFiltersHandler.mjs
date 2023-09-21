import Boom from '@hapi/boom';
import HttpStatusCodes from 'http-status-codes';
import express from 'express';
import applyFilters from '../controllers/filters/applyFilters.mjs';

const applyFiltersHandler = express.Router();
// eslint-disable-next-line
applyFiltersHandler.post('/', async (req, res, next) => {
  try {
    const { body } = req;
    const { files } = req;
    // eslint-disable-next-line
    console.log(files);
    const response = await applyFilters(body, files);
    return res.status(HttpStatusCodes.OK).json(response);
  } catch (error) {
    const err = Boom.isBoom(error) ? error : Boom.internal(error);
    next(err);
  }
});
export default applyFiltersHandler;
