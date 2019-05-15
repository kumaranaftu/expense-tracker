const express = require('express');

let routes = (Expense) => {

  let expenseRouter = express.Router();
  let expenseController = require("../controllers/expenseController")(Expense);

  expenseRouter.route("/")
    .post(expenseController.createExpense)
    .get(expenseController.getExpenses);

  expenseRouter.route("/report")
      .get(expenseController.getExpensesReport);

  expenseRouter.use("/:expenseId", expenseController.getExpenseModel);
  expenseRouter.route("/:expenseId")
    .put(expenseController.updateExpense)
    .delete(expenseController.deleteExpense)
    .get(expenseController.getExpense);

  return expenseRouter;
};

module.exports = routes;
