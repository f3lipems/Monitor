const express = require('express');
const router = express.Router();
const monitor = require('../../controllers/monitorActions');

router.get('/', monitor.monitorUpdate);

module.exports = router;