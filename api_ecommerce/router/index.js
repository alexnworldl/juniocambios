import routerx from 'express-promise-router'
import User from './User'
import Categoria from './Categoria'
import Product from './Product'
import Slider from './Slider'
import Cupone from './Cupone'
import Discount from './Discount'
import Home from './Home'


const router = routerx();
router.use('/users', User);
router.use('/categorias', Categoria);
router.use('/products', Product);
router.use('/sliders', Slider);
router.use('/cupones', Cupone);
router.use('/discount', Discount);
router.use('/home', Home);
//ojo con home agregar bien

export default router;