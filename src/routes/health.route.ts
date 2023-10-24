import Express from "express";
import {Request, Response} from "express";
const router = Express.Router();

router.get('/server', (req: Request, res: Response) => {
    res.status(200).send('Online');
});


export default router;
