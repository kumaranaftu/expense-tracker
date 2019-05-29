const mongoose = require("mongoose");
const moment = require("moment");
const logger = require("../config/logger")().getLogger();

let Schema = mongoose.Schema;

let checkIfTitleNotEmpty = (value) => {
  return ( value.trim().length > 0 ? true:false)
};

let allowOnlyAlphabetsAndSpace = (value) => {
  return (/^[a-zA-Z_\s&-]+$/.test(value));
};

let validateMaxLenghtForTitle = (value) => {
  return ( value.trim().length <= 50? true:false);
};

let customValidatorsForTile = [
  { validator : checkIfTitleNotEmpty, msg : "Value for '{PATH}' is empty "},
  { validator : allowOnlyAlphabetsAndSpace, msg : "For {PATH} field only alpabets and spaces are allowed"},
  { validator : validateMaxLenghtForTitle, msg : " Maximum length for {PATH} is 50"}
];

// let checkIfSpentOnNotEmpty = (value) => {
//   return ( value.trim().length > 0 ? true:false)
// };

let validateForISODateFormat = (value) => {
  logger.info(`validateForISODateFormat : ${moment(value, moment.ISO_8601).isValid()}`);
  return (moment(value, moment.ISO_8601, true).isValid());
};

let customValidatorsForSpenOn = [
  //{ validator : checkIfSpentOnNotEmpty, msg : "Value for '{PATH}' can't be empty"},
  { validator : validateForISODateFormat, msg : "Value for '{PATH}' is not a valid ISO 8601 Date string"}
];

let formatSpentOnField = (spentOn) => moment.utc(spentOn).toISOString();

let expenseSchema = new Schema({
  title : { type : String, trim : true, validate : customValidatorsForTile},
	notes : { type : String , trim : true },
	currencyCode : { type : String, default : "INR" },
	spentOn : { type: Date, set : formatSpentOnField, validate : customValidatorsForSpenOn },
  deleted : { type: Boolean, default: false },
  createdAt : { type: Date, default: Date.now },
	updatedAt : { type: Date, default : Date.now },
  amount : { type : Number },
	categories : [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

expenseSchema.path("title").required(true, "'{PATH}' field is required");
expenseSchema.path("amount").required(true, "'{PATH}' field is required");
expenseSchema.path("spentOn").required(true, "'{PATH}' field is required");
expenseSchema.path("categories").required(true, "'{PATH}' field is required");

// expenseSchema.pre("save", function(next) {
//
//   logger.info(`Inside pre-save handler for Expense model : ${this.spentOn}`);
//
//   let spentOn = this.spentOn;
//   let formatedDate = moment(spentOn).utc().format(moment.HTML5_FMT.DATE);
//
//   logger.info(`Inside pre-save handler for Expense model, Formated Date : ${formatedDate}`);
//
//   this.spentOn = formatedDate;
//   next();
// });

module.exports = mongoose.model("Expense", expenseSchema);
