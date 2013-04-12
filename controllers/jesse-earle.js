module.exports = function JesseEarle($route){
  
  $route.get['/'] = function(req, res){
    res.send('This is Jesse Earle\'s page!');
  };

  $route.get['/favorite-programming-languages'] = function(req, res){
    var languages = "Objective-c<br>JavaScript";
    res.send(languages);
  };

};