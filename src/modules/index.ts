import express, { Router } from 'express';

import sampleRouter from './sample';

const router: Router = express.Router();

router.use('/', sampleRouter);

export default router;
