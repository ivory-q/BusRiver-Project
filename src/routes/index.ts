import { Router, Request, Response } from 'express';

const router: Router = Router();

export default router.get('/', async (_req: Request, _res: Response): Promise<void> => {
  _res.send("Hello route!");
});
