import { Router } from 'express';
import record from './record';

const router = new Router();

router.use('/records', record);

export default router;
