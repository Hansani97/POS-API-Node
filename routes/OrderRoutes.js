import express from 'express'
import orderController from "../controller/OrderController.js";
import verifyUser from '../middleware/AuthMiddleware.js'

const router = express.Router();
router.post('/create',verifyUser,orderController.create);
router.get('/find-by-id',verifyUser,orderController.findById);
router.get('/find-all',verifyUser,orderController.findAll);
router.put('/update',verifyUser,orderController.update);
router.delete('/delete-by-id',verifyUser,orderController.deleteById);

router.get('/find-count',verifyUser,orderController.findCount);
router.get('/find-all-income',verifyUser,orderController.findAllIncome);

export default router;