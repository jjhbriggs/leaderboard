require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const errorHandler = require('_middleware/error-handler');


app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/matches', require('./matches/match.controller'));

// global error handler
app.use(errorHandler);

//glicko2
updateRating = require('./rating_calc/rating');
var minutes = 60, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("Updating Matches for the day");
  updateRating();
}, the_interval);



// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));