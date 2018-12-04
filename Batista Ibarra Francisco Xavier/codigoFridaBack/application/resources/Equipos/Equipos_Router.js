import { Router } from 'express'
import Equipos_Controller from './Equipos_Controller'

const router = Router();

const controller = new Equipos_Controller();

router.get('/', controller.getPaged)
router.get('/:id', controller.getById)
router.post('/:idEquipo/usuario', controller.addUsuarioToEquipo)
router.delete('/:idEquipo/usuario/:idUsuario', controller.deleteUsuarioFromEquipo)

export default router;