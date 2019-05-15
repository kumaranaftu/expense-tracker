const logger = require("../config/logger")().getLogger();
const _ = require("lodash");

let categoryController = function(Category) {

  let getCategoryModel = async (request, response, next) => {

    try {

      let categoryId = request.params.categoryId;
      if(!categoryId) {
        return response.status(404).send( { success : false, error : { message : "CategoryId is empty or undefined or null"} } );
      }

      logger.info(`Inside getCategory fn : ${categoryId}`);

      let category = await Category.findById(categoryId);
      if(!category) {
        return response.status(404).send( { success : false, error : { message : "Category not found"} } );
      }

      request.category = category;
      next();

    } catch(error) {
      logger.error(`Error in getCategoryModel fn :`, error);
      response.status(500).send({ success : false, error : error});
    }
  };

  // let validateFieldsInCategoryModle = async (category) => {
  //
  //   try {
  //     await category.validate();
  //   } catch(validationErrors) {
  //     logger.error(`Validation error for createCategory fn :`, validationErrors);
  //     let errorResponse = {};
  //     Object.entries(validationErrors.errors).forEach( ([fieldName, validationErrorObj] ) => errorResponse[fieldName] = validationErrorObj.message);
  //     return response.status(400).send({ success : false, error : errorResponse});
  //   }
  // };

  let createCategory = async (request, response) => {

    try {

      let requestBody = request.body;
      logger.info(`Input JSON : ${JSON.stringify(requestBody)}`);
      logger.info(`Name : ${requestBody.name}`);

      if(_.isEmpty(requestBody)) {
        return response.status(404).send( { success : false, error : { message : "JSON in the request body is empty"} } );
      }

      const category = new Category( { name : requestBody.name});

      try {
        await category.validate();
      } catch(validationErrors) {
        logger.error(`Validation error for createCategory fn :`, validationErrors);
        let errorResponse = {};
        Object.entries(validationErrors.errors).forEach( ([fieldName, validationErrorObj] ) => errorResponse[fieldName] = validationErrorObj.message);
        return response.status(400).send({ success : false, error : errorResponse});
      }

      let newCategory = await category.save();

      logger.info(`CategoryId : ${newCategory._id}`);

      response.status(201).send({ success : true, data : newCategory});

      // 400 - Bad request if some fields are missing or not proper type
      // 404 - resource not found
      // 500 - Server error
    } catch(error) {

      let message = null;

			if(_.isError(error))
				message = error.message;
			else
				message = error;

      logger.error(`Error in categoryController fn : `, error);
      response.status(500).send({ success : false, error : { message}});
    }
  };

  let updateCategory = async (request, response) => {

    try {

      let categoryId = request.params.categoryId;
      let requestBody = request.body;
      if(_.isEmpty(requestBody)) {
        return response.status(404).send( { success : false, error : { message : "JSON in the request body is empty"} } );
      }

      let name = requestBody.name;

      //let category = await Category.findByIdAndUpdate(categoryId, { $set : { name : name}, $currentDate : { updatedAt : true}}, { new: true });

      let category = request.category;
      category.set({ name : name, updatedAt : Date.now()});

      try {
        await category.validate();
      } catch(validationErrors) {
        logger.error(`Validation error for createCategory fn :`, validationErrors);
        let errorResponse = {};
        Object.entries(validationErrors.errors).forEach( ([fieldName, validationErrorObj] ) => errorResponse[fieldName] = validationErrorObj.message);
        return response.status(400).send({ success : false, error : errorResponse});
      }

      let updatedCategory = await category.save();
      response.status(200).send( { success : true, data : updatedCategory } );
    } catch(error) {
      logger.error(`Error in getCategoryModel fn :`, error);
      response.status(500).send({ success : false, error : error});
    }
  };

  let getCategory = function(request, response) {

    try {

      let category = request.category;
      response.status(200).send( { success : true, data : category } );

    } catch(error) {
      logger.error(`Error in getCategory fn : `, error);
      response.status(500).send({ success : false, error : { message : error.message}});
    }
  }

  let deleteCategory = async (request, response) => {

    try {

      let categoryId = request.params.categoryId;

      let category = await Category.findByIdAndUpdate(categoryId, { $set : { deleted : true, updatedAt : Date.now()}}, { new: true });

      response.status(200).send( { success : true, data : category } );

    } catch(error) {
      logger.error(`Error in deleteCategory fn : `, error);
      response.status(500).send({ success : false, error : { message : error.message}});
    }
  };

  let getCategories = async (request, response) => {

    try {

      let categories = await Category.find({
        deleted : false,
      }).sort({ name : 1}).select( { __v : 0});

      response.status(200).send({ sucess : true, data : categories});
    } catch(error) {
      logger.error(`Error in getCategories fn : `, error);
      response.status(500).send({ success : false, error : { message : error.message}});
    }
  }

  let publicAPI = {
    getCategoryModel : getCategoryModel,
    createCategory : createCategory,
    updateCategory :  updateCategory,
    getCategory : getCategory,
    deleteCategory : deleteCategory,
    getCategories : getCategories
  };

  return publicAPI;
}

module.exports = categoryController;
