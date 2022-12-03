const mongoose = require("mongoose");

const VerbSchema = new mongoose.Schema({
 
  word: {
    type: String,
   
  }
});

module.exports = mongoose.model("Verb", VerbSchema);
