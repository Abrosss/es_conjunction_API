const Verb = require("../models/Verb")
module.exports = {
 
  getVerbs: async (req, res) => {
    let verb = req.params.verb
    try {
      const word = await Verb.find({word:verb})
      res.json(word)
     
    } catch (err) {
      console.log(err);
    }

  }, 
  oneRoot: async (req, res) => {
    let verb = req.params.verb
    try {
      const words = await Verb.aggregate([
        {
          $match: {
            "meaning.infinitive": verb
          }
        }
      ])
      res.json(words)
     
    } catch (err) {
      console.log(err);
    }

  }
}