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
to http://jesseearle.com/.  This all happens automatically in the
background.