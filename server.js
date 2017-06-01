var express = require("express");
var app = express();
var http = require('http');

/* serves main page */
app.get("/", function(req, res) {
   res.sendfile('index.html')
});
/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
    res.sendfile( __dirname + req.params[0]);
});

app.listen(8080, function() {
  console.log("Listening on 8080");
});
http.get({
  method:'GET',
  host:'https://api.github.com/user',
  port:80,
  headers: {
    'Authorization':' Basic Y2hhbmsxZTpnaXRodWIxMjM0NTk4Nw=='
  }
},
function(msg){
  console.log(msg);
})
