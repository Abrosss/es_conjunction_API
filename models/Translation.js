const mongoose = require("mongoose");

const TranslationSchema = new mongoose.Schema({
 
  word: {
    type: String,
   
  },
  translation: {
    type: Array
  }
});

module.exports = mongoose.model("Translation", TranslationSchema);
