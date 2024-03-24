const express = require("express"),
  path = require("path"),
  cors = require("cors"),
  mongoose = require("mongoose"),   
  bodyParser = require("body-parser");
  logger  = require('morgan');
config = require("./DB");

//  API file for interacting with MongoDB
const businessRoute = require("./routes/business.route");
const ownerRoute = require("./routes/owner.route");

mongoose.Promise = global.Promise;
// mongodb-connection-string - first param -> [config.DB] use that if you want to use local DB

// mongodb+srv://test:test123@cluster0.dietn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
const mongodbConnectionString =
config.DB;
// remove the deprecation warning by adding the option useUnifiedTopology
mongoose
  .connect(mongodbConnectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database is connected");
    },
    (err) => {
      console.log("Can not connect to the database" + err);
    }
  );

const app = express();
app.use(bodyParser.json());

// app.use((req, res, next) =>{
//   res.header("Access-Control-Allow-origin", "*")
//   res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE")
//   res.header("Access-Control-Allow-Headers", "Origin",
//   "X-Requested-With", "Content-Type", "Accept")
//   next()
//   })
  app.use(cors());
  // var corsOptions = {
  //   origin: "http://localhost:8081"
  // };
  // app.use(cors(corsOptions));
  app.options('*', cors()); // to solve express server cors error

// post express node js input, send form data(Html input data) to apis
// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// parse requests of content-type - application/json
// app.use(express.json());

app.use(logger('dev'));  // Some other presets available are combined, common, short, tiny

// // Angular DIST output folder
// app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use("/business", businessRoute);
app.use("/owner", ownerRoute);

const port = process.env.port || 4000; // You can specify any available port over here.

const server = app.listen(port, function () {
  console.log("Listening on  " + port);
});


