const logger = require("../config/logger")().getLogger();
const _ = require("lodash");
const moment = require("moment");

let expenseController= function(Expense) {

  let getExpenseModel = async (request, response, next) => {

    try {

      let expenseId = request.params.expenseId;
      if(!expenseId) {
        return response.status(404).send( { success : false, error : { message : "ExpenseId is empty or undefined or null"} } );
      }

      logger.info(`Inside getExpenseModel fn : ${expenseId}`);

      let expense = await Expense.findById(expenseId).populate("categories");
      if(!expense) {
        return response.status(404).send( { success : false, error : { message : "Expense not found"} } );
      }

      request.expense = expense;
      next();

    } catch(error) {
      logger.error(`Error in getExpenseModel fn :`, error);
      response.status(500).send({ success : false, error : error});
    }
  };

  let checkForISO8601Format = (spentOn) => moment(spentOn, moment.HTML5_FMT.DATE, true).isValid();

  //moment.HTML5_FMT.DATE
  let formatSpentOnField = (spentOn) => moment.utc(spentOn).toISOString();

  let createExpense = async (request, response) => {

    try {

      let requestBody = request.body;
      if(_.isEmpty(requestBody)) {
        return response.status(404).send( { success : false, error : { message : "JSON in the request body is empty"} } );
      }

      logger.info(`Inside createExpense - RequestBody : ${JSON.stringify(requestBody)}`);

      if(!requestBody.hasOwnProperty("spentOn")) {
        return response.status(400).send({ success : false, error : { spentOn : "Field is required"}});
      }

      let spentOn = requestBody.spentOn;

      let expenseObjForInit = {
        title : requestBody.title,
        amount : requestBody.amount,
        notes : requestBody.notes,
        categories : requestBody.categories
      };

      if(!checkForISO8601Format(spentOn)) {
        return response.status(400).send({ success : false, error : { spentOn : "Accepted format of ISO 8601 date string is YYYY-MM-DD"}});
      }

      //let formatedDate = formatSpentOnField(spentOn);
      //logger.info(`Inside Formated Date : ${formatedDate}`);
      //expenseObjForInit["spentOn"] = formatedDate;

      expenseObjForInit["spentOn"] = spentOn;
      const expense = new Expense(expenseObjForInit);

      try {
        await expense.validate();
      } catch(validationErrors) {
        logger.error(`Validation error for createExpense fn :`, validationErrors);
        let errorResponse = {};
        Object.entries(validationErrors.errors).forEach( ([fieldName, validationErrorObj] ) => errorResponse[fieldName] = validationErrorObj.message);
        return response.status(400).send({ success : false, error : errorResponse});
      }

      let newExpense = await expense.save();

      logger.info(`ExpenseId : ${newExpense._id}`);

      response.status(201).send({ success : true, data : newExpense});

    } catch(error) {
      logger.error(`Error in createExpense fn : `, error);
      response.status(500).send({ success : false, error : { message : error.message}});
    }
  };

  let updateExpense = async (request, response) => {

    try {

      let expenseId = request.params.expenseId;
      let requestBody = request.body;
      if(_.isEmpty(requestBody)) {
        return response.status(404).send( { success : false, error : { message : "JSON in the request body is empty"} } );
      }

      logger.info(`Inside updateExpense - RequestBody : ${JSON.stringify(requestBody)}`);

      if(!requestBody.hasOwnProperty("spentOn")) {
        return response.status(400).send({ success : false, error : { spentOn : "Field is required"}});
      }

      let queryObj = {
        title : requestBody.title,
        amount : requestBody.amount,
        notes : requestBody.notes,
        categories : requestBody.categories,
        updatedAt : Date.now()
      };

      let spentOn = requestBody.spentOn;
      if(!checkForISO8601Format(spentOn)) {
        return response.status(400).send({ success : false, error : { spentOn : "Accepted format of ISO 8601 date string is YYYY-MM-DD"}});
      }

      queryObj["spentOn"] = spentOn;

      let expense = request.expense;
      expense.set(queryObj);

      try {
        await expense.validate();
      } catch(validationErrors) {
        logger.error(`Validation error for updateExpense fn :`, validationErrors);
        let errorResponse = {};
        Object.entries(validationErrors.errors).forEach( ([fieldName, validationErrorObj] ) => errorResponse[fieldName] = validationErrorObj.message);
        return response.status(400).send({ success : false, error : errorResponse});
      }

      let updatedExpense = await expense.save();
      response.status(200).send( { success : true, data : updatedExpense } );
    } catch(error) {
      logger.error(`Error in updateExpense fn :`, error);
      response.status(500).send({ success : false, error : error});
    }
  };

  let deleteExpense = async (request, response) => {

    try {

      let expenseId = request.params.expenseId;

      let expense = await Expense.findByIdAndUpdate(expenseId, { $set : { deleted : true, updatedAt : Date.now()}}, { new: true });

      response.status(200).send( { success : true, data : expense } );

    } catch(error) {
      logger.error(`Error in deleteExpense fn : `, error);
      response.status(500).send({ success : false, error : { message : error.message}});
    }
  };

  let getExpense = async (request, response) => {

    try {

      let expense = request.expense;
      response.status(200).send( { success : true, data : expense } );

    } catch(error) {
      logger.error(`Error in getExpense fn : `, error);
      response.status(500).send({ success : false, error : { message : error.message}});
    }
  };

  let getExpenses = async (request, response) => {

    try {

      logger.info(`Inside getExpenses - QueryParameters : ${JSON.stringify(request.query)}`);

      var queryOptions = {
        deleted : true
      };

      let spentOn = request.query.spentOn;
      let spentFrom = request.query.spentFrom;
      let spentTill = request.query.spentTill;

      // if(spentOn && !moment(requestBody.spentOn, moment.ISO_8601, true).isValid()) {
      //   return response.status(400).send({ success : false, error : { spentOn : "Is not a valid ISO 8601 Date string"}});
      // } else {
      //
      // }
      //
      // if(spentFrom && spentTill) {
      //   return response.status(400).send({ success : false, error : { spentOn : "Is not a valid ISO 8601 Date string"}});
      // }

      // if(!checkForISO8601Format(spentOn)) {
      //   return response.status(400).send({ success : false, error : { spentOn : "Is not a valid ISO 8601 Date string"}});
      // }

      if(spentOn) {
        queryOptions["spentOn"] = formatSpentOnField(spentOn)
      } else {
        if(spentFrom && spentTill) {
          queryOptions["spentOn"] = {
            $gt : formatSpentOnField(spentFrom),
            $lt : formatSpentOnField(spentTill)
          };
        }
      }

      logger.info(`QueryParameters for DB : ${JSON.stringify(queryOptions)}`);

      let expenses = await Expense.find(queryOptions).populate("categories").sort({ title : 1}).select( { __v : 0});

      response.status(200).send({ sucess : true, data : expenses});
    } catch(error) {
      logger.error(`Error in getExpenses fn : `, error);
      response.status(500).send({ success : false, error : { message : error.message}});
    }
  };

  let getExpensesReport = async (request, response) => {

    try {

      logger.info(`Inside getExpensesReport - QueryParameters : ${JSON.stringify(request.query)}`);

      var queryOptions = {
        deleted : true
      };

      let spentOn = request.query.spentOn;
      let spentFrom = request.query.spentFrom;
      let spentTill = request.query.spentTill;

      if(spentOn) {
        queryOptions["spentOn"] = formatSpentOnField(spentOn);
      } else {
        if(spentFrom && spentTill) {
          queryOptions["spentOn"] = {
            $gt : formatSpentOnField(spentFrom),
            $lt : formatSpentOnField(spentTill)
          };
        }
      }

      logger.info(`QueryParameters for DB : ${JSON.stringify(queryOptions)}`);
      
      var o = {};

      o.map = function() {

          for(let categoryId of this.categories) {
            emit(categoryId, {
               count : 1,
               amount : this.amount
             });
          }
      };

      o.reduce = function(categoryId, arrayOfMappedInfo) {

        let reducedVal = { count : 0, amount : 0.00};
        for(let mappedInfo of arrayOfMappedInfo) {
          reducedVal.count += mappedInfo.count;
          reducedVal.amount += mappedInfo.amount;
        }

        return reducedVal;
      };

      o.query = queryOptions;
      o.out = { inline: 1};

      o.resolveToObject = true;
      let output = await Expense.mapReduce(o);

      response.status(200).send({ sucess : true, data : output});
    } catch(error) {
      logger.error(`Error in getExpensesReport fn : `, error);
      response.status(500).send({ success : false, error : { message : error.message}});
    }
  };

  let publicAPI = {
    getExpenseModel : getExpenseModel,
    createExpense : createExpense,
    updateExpense : updateExpense,
    deleteExpense : deleteExpense,
    getExpense : getExpense,
    getExpenses : getExpenses,
    getExpensesReport : getExpensesReport
  };

  return publicAPI;
}

module.exports = expenseController;
