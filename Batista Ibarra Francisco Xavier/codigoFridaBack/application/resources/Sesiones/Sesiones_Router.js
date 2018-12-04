import { Router } from 'express'
import Sesiones_Controller from './Sesiones_Controller'

const router = Router();

const controller = new Sesiones_Controller();

router.post('/', controller.logIn)

export default router;