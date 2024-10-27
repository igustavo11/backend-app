import {Router} from 'express';
import multer from 'multer';

import { CreateUserController } from './controllers/user/CreateUserController'
import {AuthUserController} from './controllers/user/AuthUserController'
import {DetailUserController} from './controllers/user/DetailUserController'
import {CreateCategoryController} from './controllers/category/CreateCategoryController'
import {ListCategoryController} from './controllers/category/ListCategoryController'
import {CreateProductController} from './controllers/product/CreateProductController'
import {ListByCategoryController} from './controllers/product/ListByCategoryController'
import {CreateOrderController} from './controllers/order/CreateOrderController'
import {RemoveOrderController} from './controllers/order/RemoveOrderController'
import {AddItemController} from './controllers/order/AddItemController'
import {RemoveItemController} from './controllers/order/RemoveItemController'
import {SendOrderController} from './controllers/order/SendOrderController'
import {ListOrdersControllers} from './controllers/order/ListOrdersControllers'
import {DetailOrderController} from './controllers/order/DetailOrderController'
import {FinishOrderController} from './controllers/order/FinishOrderController'



import {isAuthenticated} from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'


const router = Router();
const upload = multer(uploadConfig.upload("./tmp"))
//rotas user
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle )

//-- rotas de categorias
router.post('/category', isAuthenticated, new CreateCategoryController().handle )
router.get('/category', isAuthenticated, new ListCategoryController().handle) 

//rotas produtos
//router.post('/produtos', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.post('/produtos', isAuthenticated, new CreateProductController().handle)
router.get('/category/produtos', isAuthenticated, new ListByCategoryController().handle)

//rotas orders
router.post('/orders', isAuthenticated, new CreateOrderController().handle)
router.delete('/orders', isAuthenticated, new RemoveOrderController().handle)
router.post('/orders/add', isAuthenticated, new AddItemController().handle)
router.delete('/orders/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/orders/send', isAuthenticated, new SendOrderController().handle)
router.get('/orderstotal' , isAuthenticated , new ListOrdersControllers().handle)
router.get('/orders/detail', isAuthenticated, new DetailOrderController().handle)
router.put('/orders/finish', isAuthenticated, new FinishOrderController().handle)


export{router};