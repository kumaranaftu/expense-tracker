const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const logger = require("./config/logger")().getLogger();
const SERVER_PORT = 8080;

let initialzeServer = (app) => {
  return new Promise( (resolve, reject) => {

    app.listen( SERVER_PORT, function(error) {

      if(error)
        return reject(error);

      resolve( { success : true});
    });
  });
}

let initializeApp = async () => {

  var mongoDB = null;
  try {

    // MongoDB URL
    mongoDB = "";
    mongoose.Promise = global.Promise;

    logger.info(`Connecting to MongoDB`);

    const config = {
      useNewUrlParser: true
    };
    
    await mongoose.connect(mongoDB, config);
    logger.info(`Connected to MongoDB`);
    let app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.static(path.resolve(__dirname, '../../dist')));

    let Expense = require("./models/expenseModel");
    let Category = require("./models/categoryModel");

    let expenseRouter = require("./routes/expenseRoutes")(Expense);
    let categoryRouter = require("./routes/categoryRoutes")(Category);

    app.use("/api/v1/Expenses", expenseRouter);
    app.use("/api/v1/Categories", categoryRouter);

    // app.get("/", (request, response) => {
    //   return response.send("index")
    // });

    await initialzeServer(app);

  } catch(error) {
      logger.error(`Error in inititalizeApp fn : `, error);
      return Promise.reject(error.message);
  }
  return { success : true };
};

initializeApp()
  .then( (response) => logger.info(`Server listening at PORT : ${SERVER_PORT}`))
  .catch( (error) => logger.error(`Error in initializing the App :`, error));
