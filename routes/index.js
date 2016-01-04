var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/partials/:component/:name', function (req, res) {
  var component = req.params.component;
  var name = req.params.name;
  
  console.log(component);
  console.log(name);
  
  res.render(component + '/views/' + name);
});

module.exports = router;
