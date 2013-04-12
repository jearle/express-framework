var Filters = (function(){
  var Filters = function(){};

  Filters.route = function(arg){
    return arg.match(/^\$route$/);
  };

  Filters.model = function(arg){
    return arg.match(/^\$model$/);
  };
  
  return Filters;
}());

module.exports = Filters;