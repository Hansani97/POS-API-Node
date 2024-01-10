import express from 'express'
import customerController from "../controller/CustomerController.js";
import verifyUser from '../middleware/AuthMiddleware.js'


const router = express.Router();

router.post('/create',verifyUser,customerController.create);
router.get('/find-by-id/:id',verifyUser,customerController.findById);
router.get('/find-all',verifyUser,customerController.findAll);
router.put('/update/:id',verifyUser,customerController.update);
router.delete('/delete-by-id/:id',verifyUser,customerController.deleteById);
router.get('/find-count',verifyUser,customerController.findCount);


export default router;