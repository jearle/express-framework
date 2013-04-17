module.exports = function Base($route){
  
  $route.get['/*'] = function(req, res, next){
    // debugger;
    if(!req.session.authenticated 
        && req.originalUrl !== '/login'
        && !req.originalUrl.match(/^(.*)\.css$/)
        && !req.originalUrl.match(/^(.*)\.js$/)
        && !req.originalUrl.match(/^(.*)\.png$/)
        && !req.originalUrl.match(/^(.*)\.jpg$/)){
      res.redirect('/login');
    } else {
      next();
    }
  };

  $route.get['/'] = function(req, res){
    res.send('Hello, World!');
  };

};