const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3001;
var passport = require("./config/passport");
var db = require("./models");
var session = require("express-session");
var http = require('http').Server(app);
var io = require('socket.io')(http);





// Define middleware here
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets (usually on heroku)

// if (process.env.NODE_ENV === "production") {
app.use(express.static("client/build"));
// }
// else{
//   app.use(express.static("client/public/user"));
// }
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



require("./routes/api-routes.js")(app,io)


const routes = require("./routes/sequelize-template-routes.js")
app.get('/*',function(req,res){
  res.sendFile(__dirname+ '/client/build/index.html')
})
app.use(routes)
// Start the API server
db.sequelize.sync().then(function(){
    http.listen(PORT, function() {
        console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
      });
})

