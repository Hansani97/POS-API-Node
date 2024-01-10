import express from 'express'
import productController from "../controller/ProductController.js";
import verifyUser from '../middleware/AuthMiddleware.js'

const router = express.Router();

router.post('/create',verifyUser,productController.create);
router.get('/find-by-id/:id',verifyUser,productController.findById);
router.get('/find-all',verifyUser,productController.findAll);
router.put('/update/:id',verifyUser,productController.update);
router.delete('/delete-by-id/:id',verifyUser,productController.deleteById);
router.get('/find-all-min',verifyUser,productController.findAllMin);
router.get('/find-count',verifyUser,productController.findCount);
export default router;