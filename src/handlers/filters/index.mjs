import { Router } from 'express';
import multer from 'multer';
import applyFilterHandler from '../applyFiltersHandler.mjs';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.array('images[]'), applyFilterHandler);
export const test = () => {};
export default router;
