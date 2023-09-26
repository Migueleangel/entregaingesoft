import { Router } from 'express';
import multer from 'multer';
import applyFilterHandler from '../applyFiltersHandler.mjs';

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', (req, res) => {
  res.send('ok images GET');
});

router.post('/', upload.array('files[]'), applyFilterHandler);
export const test = () => {};
export default router;
