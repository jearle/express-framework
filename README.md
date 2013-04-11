## Express-Framework

  A batteries included approach to building server side applications.

## Controllers

  Your application controllers act as a place to store all of your routes 
request/response behavior.  

  Your controllers are the place where you will both take incoming data 
and pass it along to your models to perform business logic on it, as well
as return the processed business logic back to your clients.

  Lets take a look at a simple simple example:

```js
module.exports = function Base($route){
  
  $route.get['/'] = function(req, res){
    res.send('hello');
  };

};
```

  You should be familiar with the module.exports syntax, but the 
function Base($route) has somewhat of a special meaning.  Base is a 
reserved controller name which refers to the base/root/index of a 
URI.  For example if you are running the server from
jesseearle.com,  the Base controller would route res.send('hello')
to http://jesseearle.com/.  This all happens automatically.

  Let look at a more complicated example:

```js
module.exports = function JesseEarle($route){
  
  $route.get['/'] = function(req, res){
    res.send('This is Jesse Earle\'s page!');
  };

  $route.get['/favorite-programming-languages'] = function(req, res){
    var languages = "Objective-c<br>JavaScript";
    res.send(languages);
  };

};
```

  As you may have noticed the preferred style for URI schemes is snake
case.

  As in the case of the simple Base controller, the name of the controller
is relevant.  In this case JesseEarle will be converted into snake case and
the final URI would look like this http://jesseearle.com/jesse-earle which
will respond with the "This is Jesse Earle's Page!" in the browser.

  Furthermore http://jesseearle.com/jesse-earle/favorite-programming-languages
will respond with "Objective-c<br>JavaScript".

### The $route Parameter

  You may have noticed the $route parameter seems to just magically work. Using
a system similiar to Angular.js' dependency injection the parameters of the
controller function are read and passed into the function with meaning.  The
routes contained in the ['/my-route'] act exactly the same as they in express.

  For example:

```js
module.exports = function Base($route){
  
  $route.get['/:name'] = function(req, res){
    res.send('hello ' + req.params.name '!');
  };

};
```

  The response for http://jesseearle.com/fred would be "hello fred!".
