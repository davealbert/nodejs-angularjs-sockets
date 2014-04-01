
/*
 * GET home page.
 */

exports.connectionCount = 0;

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
  exports.connectionCount += 1;
};

exports.stuff = function(req, res){
  res.send('Connections: ' + exports.connectionCount);
};
