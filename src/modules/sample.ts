import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  return res.status(200).send('Hello, world!');
});

export default router;
