var Filters = (function(){
  var Filters = function(){};

  Filters.route = function(arg){
    return arg.match(/^\$route$/);
  };

  Filters.model = function(arg){
    return arg.match(/^\$model$/);
  };

  Filters.models = function(arg){
    return arg.match(/^\$models$/);
  };
  
  return Filters;
}());

module.exports = Filters;