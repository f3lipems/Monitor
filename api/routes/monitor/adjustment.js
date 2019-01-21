const express = require('express');
const router = express.Router();
const monitor = require('../../controllers/monitorActions');

router.post('/', monitor.monitorAdjustment);
router.put('/', monitor.monitorAdjustment);

module.exports = router;