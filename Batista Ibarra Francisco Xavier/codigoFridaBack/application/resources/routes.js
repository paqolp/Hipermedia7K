import { Router } from 'express'
import Usuarios_Router from './Usuarios/Usuarios_Router'
import Sesiones_Router from './Sesiones/Sesiones_Router'
import Modulos_Router from './Modulos/Modulos_Router'
import ContenidoAdicional_Router from './ContenidoAdicional/ContenidoAdicional_Router'
import Equipos_Router from './Equipos/Equipos_Router'

import Sesiones_Controller from './Sesiones/Sesiones_Controller';
const middlewareSesion = new Sesiones_Controller().checkSesion;

const router = Router();

router.use('/usuarios', Usuarios_Router)
router.use('/sesiones', Sesiones_Router)
router.use('/modulos', middlewareSesion, Modulos_Router)
router.use('/contenidoAdicional', middlewareSesion, ContenidoAdicional_Router)
router.use('/equipos', middlewareSesion, Equipos_Router)

export default router