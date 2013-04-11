var Filters = (function(){
  var Filters = function(){};

  Filters.route = function(arg){
    return arg.match(/^\$route$/)
  };
  
  return Filters;
}());

module.exports = Filters;