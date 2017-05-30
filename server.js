var express = require("express");
var app = express();

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
