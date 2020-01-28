import {Router} from 'express';
import {ApplicationController} from '../controllers/application-controller';

const router = Router();
const appController = new ApplicationController();

router.post('/', appController.createApplication);

export default router;