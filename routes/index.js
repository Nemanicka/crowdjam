var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/sequencer.jade', function(req, res) {
  res.render('sequencer');
});

module.exports = router;
