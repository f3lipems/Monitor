var express = require('express');
var router = express.Router();
const monitor = require('../../controllers/monitorActions');

router.get('/', monitor.monitorPanel);

module.exports = router;