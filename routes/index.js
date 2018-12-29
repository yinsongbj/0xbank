var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET collision page.*/
router.get('/collision', function(req, res, next) {
  res.render('collision', { title: 'Ethereum Collision' });
});

module.exports = router;
