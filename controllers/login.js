module.exports = function Login($route, $models){
  $route.get['/'] = function(req, res){
    res.render('login', {
      title: 'Express Framework Login'
    });
  };

  $route.post['/'] = function(req, res){
    // console.log('posting to login!');
    // res.redirect('/login');
    $models.User.find(function(err, docs){
      if (err) throw new Error(err);
      res.send(docs);
    });
  };
};