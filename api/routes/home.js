var express = require('express');
var router = express.Router();
const monitor = require('../controllers/monitorActions');

router.get('/', monitor.monitorCreate);

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('home.html', { title: 'Code Challenge' });
// });

module.exports = router;