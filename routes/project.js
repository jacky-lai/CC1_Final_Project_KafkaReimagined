let express = require('express');
let router = express.Router();

router.get('/', function(_req, res){
    res.render('project');
});
module.exports = router;