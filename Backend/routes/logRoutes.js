import express from 'express';
import {getLogs, createLog, getSpecificLog, getStats} from '../controllers/logController.js';
import {auth} from '../middleware/auth.js'
import { authorize } from '../middleware/authorize.js';

const router = express.Router();
router.get('/', auth, authorize(['admin','analyst']), getLogs);
router.post('/',auth,authorize(['admin']),createLog);
router.get('/stats',auth,authorize(['admin', 'analyst']),getStats);
router.get('/:txnId',auth,authorize(['admin', 'analyst']), getSpecificLog);

export default router;