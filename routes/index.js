
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Hello World!!!!!! ECS welcomes you' });
};
