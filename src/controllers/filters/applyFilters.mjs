import Joi from 'joi';
import Boom from '@hapi/boom';
import sharp from 'sharp';
import { BLUR_FILTER, GREYSCALE_FILTER, NEGATIVE_FILTER } from '../../commons/constants.mjs';
import Process from '../../models/Process.mjs';

const PayloadValidation = Joi.object({
  filters: Joi.array().min(1).items(Joi.string().valid(
    NEGATIVE_FILTER,
    GREYSCALE_FILTER,
    BLUR_FILTER,
  )),

});
const applyFilters = async (payload, files) => {
  // eslint-disable-next-line
  console.log(payload);
  try {
    await PayloadValidation.validateAsync(payload);
    const { filters } = payload;
    const processedFiles = await Promise.all(files.map(async (file) => {
      const { originalname, buffer } = file;
      const image = sharp(buffer);
      const processedBuffer = await image.toBuffer();
      return { originalname, buffer: processedBuffer };
    }));
    const newProcess = new Process();
    newProcess.filters = filters;
    newProcess.processedFiles = processedFiles;
    await newProcess.save();
    return 'Filtros aplicados';
  } catch (error) {
    throw Boom.badData(error.message, { error });
  }
};

export default applyFilters;
