import { createForm, getForms, getForm, deleteForm, updateform } from '../controllers/formController.js';
import { createSubmission, getSubmissions } from '../controllers/submissionController.js';
import {validateBody, validateUpdateBody, validateUUID, validateSubmissionBody} from '../middlewares/validate.js';
// router
import { Router } from 'express';
const router = Router();

// use routers
router.post('/createform', validateBody, createForm);
router.get('/getforms', getForms);
router.get('/getform', validateUUID, getForm);
router.delete('/deleteForm', validateUUID, deleteForm);
router.put('/updateform', validateUUID, validateUpdateBody, updateform);

router.post('/submit', validateSubmissionBody, createSubmission);
router.get('/getSubmissions', getSubmissions);

export default router;