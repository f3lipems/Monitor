var express = require('express');
var router = express.Router();
const monitor = require('../../controllers/monitorActions');

router.post('/', monitor.monitorNormalize);

module.exports = router;