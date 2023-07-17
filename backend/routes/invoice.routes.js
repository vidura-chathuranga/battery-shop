import express from 'express';
import { validateWorkerAndAdmin } from '../middlewares/authMiddleware.js';
import { addInvoice, getAllInvocies,generateInvoice } from '../controllers/invoice.controller.js';

const router = express.Router();

// add invoice to the database route
router.get('/',validateWorkerAndAdmin,getAllInvocies);
router.post('/add',validateWorkerAndAdmin,addInvoice);
router.get('/generate',validateWorkerAndAdmin,generateInvoice);


export default router;