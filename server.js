var sys = require('sys');
var http = require('http');

var Tork = require('./tork');
var App = require('./app');


// var TorkApplication = Base.extend({
//   constructor: function(){
//     this.port = 8000; // TODO: make this variable
//     this.server = http.createServer(function(req,res){
//       Tork.router(req.url, App.routes, function(callback){
//         if (callback != false){
//           callback(req, res);
//         } else {
//           // show 404
//           res.writeHead(200, {'Content-Type': 'text/html'});
//           res.write("<h1>404: Page not found.</h1>");
//           res.close();
//         }
//       })
//     }).listen(this.port);
//     sys.puts("Server running at http://127.0.0.1:" + port + "/");
//   },
//   // default params
//   
//   // instance methods
//   
// }, {
//  // class-wide interfaces 
// })
// 
// var Application = TorkApplication.extend();


// http.createServer(function (req, res) {
//   Tork.router(req.url, App.routes, function(callback){
//     if (callback != false){
//       eval(callback)(req, res);
//     } else {  
//       // Show 404
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.write("<h1>404: Page not found.</h1>");
//       res.close();
//     }
//   });  
// }).listen(8000);
// sys.puts('Server running at http://127.0.0.1:8000/');


var fu = require('./fu');
var url = require("url");
var qs = require("querystring");
var multipart = require('multipart');
fu.listen(8000, null);

// Example of a root GET page
fu.get("/", function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Home!");
  res.close();
});

// Example of a non-root GET page
fu.get("/hippo", function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("Ohai, Hippo!");
  res.close();
});

// Example of GET page with single GET parameter 'id'
fu.get("/recv", function(req, res){
  var id = qs.parse(url.parse(req.url).query).id || false;
  res.writeHead(200, {'Content-Type': 'text/plain'});
  if (id){
    res.write("id is = to " + id);
  } else {
    res.write("no ?id= given");
  }
  res.close();  
});


// Example of a cheap form
fu.get("/form", function(req, res){
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('<html><body><form action="/post" method="POST" enctype="multipart/form-data"><input type="text" name="data" value="" id="data"><input type="submit" name="submit" value="Submit" id="submit"></form></body></html>')
  res.close();
});

// Example of a POST request
fu.post("/post", function(req, res){
  var mp = multipart.parse(req);
  var fields = {};
  var name, filename;
  
  mp.addListener("partBegin", function(part){
    name = part.name;
    filename = part.filename;
    if (name){
      fields[name] = "";
    }
  });
  
  mp.addListener("body", function(chunk){
    if (name){
      if (fields[name].length > 1024) return;
      fields[name] += chunk;
    }
  });
  
  mp.addListener("complete", function(){
    res.writeHead(200,{
      "context-type": "text/plain"
    });
    res.write(sys.inspect(fields));
    res.close();
  })
})