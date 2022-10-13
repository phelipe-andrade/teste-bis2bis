import express from 'express';
import universitiesControllers from '../controllers/universitiesControllers.js';
const router = express.Router();
router.get('/', universitiesControllers.getUniversities);
router.get('/:id', universitiesControllers.getUniversitiesById);
router.post('/', universitiesControllers.postUniversity);
router.put('/:id', universitiesControllers.putUniversity);
router.delete('/:id', universitiesControllers.deleteUniversity);
export default router;