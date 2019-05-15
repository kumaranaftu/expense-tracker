const express = require('express');

let routes = (Category) => {

  let categoryRouter = express.Router();
  let categoryController = require("../controllers/categoryController")(Category);

  categoryRouter.route("/")
    .post(categoryController.createCategory)
    .get(categoryController.getCategories);

  categoryRouter.use("/:categoryId", categoryController.getCategoryModel);
  categoryRouter.route("/:categoryId")
    .get(categoryController.getCategory)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory);

  return categoryRouter;
};

module.exports = routes;
