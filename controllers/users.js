module.exports = function Users($route){
  
  $route.get['/'] = function(req, res){
    res.send('users!');
  };

  $route.get['/all'] = function(req, res){
    res.send('all users');
  };

  $route.get['/:id/:fuck'] = function(req, res){
    res.send(
      'user id: ' + req.params.id + 
      '\nuser fuck: ' + req.params.fuck);
  };

};