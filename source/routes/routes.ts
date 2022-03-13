import express from 'express';
import controller from '../controllers/controller';
const router = express.Router();

router.get('', controller.readFromFile);
router.post('', controller.writeToFile);

export = router;