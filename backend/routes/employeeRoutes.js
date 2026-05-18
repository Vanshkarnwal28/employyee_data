const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply auth middleware to all employee routes
router.use(authMiddleware);

router.post('/', employeeController.addEmployee);
router.get('/', employeeController.getAllEmployees);
router.get('/search', employeeController.searchEmployees);
router.put('/:id', employeeController.updateEmployee);
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
