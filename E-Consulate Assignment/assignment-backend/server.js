const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

var Users = require('./routes/user.routes');

app.use("/users",Users);

app.listen(port, function() {
  console.log('App is running on port: ' + port);
})
