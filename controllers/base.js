module.exports = function Base($route){
  
  $route.get['/'] = function(req, res){
    res.send('hello');
  };

};