import { Router } from 'express'
import ContenidoAdicional_Controller from './ContenidoAdicional_Controller'

const router = Router();

const controller = new ContenidoAdicional_Controller();

router.get('/', controller.getPaged)
router.post('/', controller.addContenido)
router.post('/:idContenidoAdicional/material', controller.uploadMaterial)

export default router;