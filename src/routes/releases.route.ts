import Express from "express";
import {updateHandler} from "../controller/release.controller";
// Routes
const router = Express.Router();
router.get('/:target/:arch/:current_version',updateHandler);

export default router;
