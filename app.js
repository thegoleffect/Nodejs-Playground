
// exports.routes = {
//   // '/':"App.controllers.Home",
//   // '/hippo':"App.controllers.Hippo"
//   '/':exports.controllers.Home,
//   '/hippo':exports.controllers.Hippo
// }

exports.controllers = {
  // These need to be abstracted into a base class
  Home: function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Home!");
    res.close();
  },

  Hippo: function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write("Ohai, Hippo!");
    res.close();
  }
}

exports.routes = {
  '/':exports.controllers.Home,
  '/hippo':exports.controllers.Hippo
}