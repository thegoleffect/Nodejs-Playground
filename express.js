require.paths.unshift('/Users/vnguyen/Documents/repos/express/lib');
require('express')
var sys = require('sys');

   
configure(function(){
  set('root', __dirname)
})

get('/', function(){
  this.redirect('/hello/world')
})

get('/hello/world', function(){
  this.render('title.haml.html', {
    layout: false,
    locals: {
      title: 'Hello World'
    }
  })
})

run()