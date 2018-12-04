import { Router } from 'express'
import Modulos_Controller from './Modulos_Controller'

const router = Router();

const controller = new Modulos_Controller();

router.get('/', controller.getPaged)
router.get('/:id', controller.getById)
router.post('/:id/contenido', controller.addContenido)
router.post('/:idModulo/contenido/:idContenido/ejercicio', controller.uploadEjercicio)
router.post('/:idModulo/contenido/:idContenido/material', controller.uploadMaterial)
router.post('/:idModulo/contenido/:idContenido/comentario', controller.addComentario)


export default router;