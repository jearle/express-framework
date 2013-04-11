var Routes = (function(){
  var Routes = function(){};
  Routes.methods = ['get', 'post', 'put', 'delete'];
  Routes.methods.forEach(function(method){
    Routes.prototype[method] = {};
  });
  Routes.new = function(){
    return new Routes();
  };
  return Routes;
}());

module.exports = Routes;