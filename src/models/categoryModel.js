const mongoose = require("mongoose");
const _ = require("lodash");

let Schema = mongoose.Schema;

let checkIfNameNotEmpty = (value) => {
  return ( value.trim().length > 0 ? true:false)
};

let checkForAllowedCharactersForName = (value) => {
  return (/^[a-zA-Z_\s&-]+$/.test(value));
};

let validateMaxLenghtForName = (value) => {
  return ( value.trim().length <= 15? true:false);
};

let checkIfCategoryNameAlreadyExist = async (value) => {

  let categories = await this.constructor.find({
    name : value,
  });

  let category =null;
  if(!_.isEmpty(categories))
    category = categories[0];

  if(!!this._id) {

    if(_.isEmpty(category)) {
      resolve();
    } else {

      if(this._id === category._id) {
        resolve();
      } else {
        reject(`Already a Category with this name - ${this.name} exist`);
      }
    }
  } else {

    if(_.isEmpty(category)) {
      resolve()
    } else {
      reject(`Already a Category with this name - ${this.name} exist`);
    }
  }
};

let customValidatorsForName = [
  { validator : checkIfNameNotEmpty, msg : "Value for '{PATH}' is empty "},
  { validator : checkForAllowedCharactersForName, msg : "For {PATH} field only alpabets,spaces and special characters( _, -, &) are allowed"},
  { validator : validateMaxLenghtForName, msg : " Maximum length for {PATH} is 15"},
  { validator : checkIfCategoryNameAlreadyExist, msg : `Already a Category with this name - {VALUE} exist`}
];


let categorySchema = new Schema({
  name : { type: String, trim : true, validate :  customValidatorsForName},
	createdAt : { type: Date, default: Date.now },
	updatedAt : { type: Date, default : Date.now },
	deleted : { type: Boolean, default : false }
});

categorySchema.path("name").required(true, "{PATH} field is required");

// categorySchema.pre("save", true, async function(next, done) {
//
//   let categories = await this.constructor.find({
//     name : this.name,
//   });
//
//   let category =null;
//   if(!_.isEmpty(categories))
//     category = categories[0];
//
//   if(!!this._id) {
//
//     if(_.isEmpty(category)) {
//       next(); done();
//     } else {
//
//       if(this._id === category._id) {
//         next(); done();
//       } else {
//         next(); done(new Error(`Already a Category with this name - ${this.name} exist`));
//       }
//     }
//   } else {
//
//     if(_.isEmpty(category)) {
//       next(); done();
//     } else {
//       next(); done(new Error(`Already a Category with this name - ${this.name} exist`));
//     }
//   }
// });

module.exports = mongoose.model("Category", categorySchema);
