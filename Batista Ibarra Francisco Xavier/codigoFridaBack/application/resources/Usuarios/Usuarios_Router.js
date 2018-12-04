import { Router } from 'express'
import Usuarios_Controller from './Usuarios_Controller'
import Sesiones_Controller from '../Sesiones/Sesiones_Controller';

const middlewareSesion = new Sesiones_Controller().checkSesion;

const router = Router();

const controller = new Usuarios_Controller();

router.get('/', middlewareSesion, controller.getPaged)
router.get('/:id', middlewareSesion, controller.getById)
router.post('/', controller.addUser)

export default router;