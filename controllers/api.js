const Verb = require("../models/Verb")
const Translation = require("../models/Translation")
module.exports = {
 
  getVerbs: async (req, res) => {
    let verb = req.params.verb
    try {
      const word = await Verb.find({word:verb}, {_id:0})
    
        res.json(word)
      
     
    } catch (err) {
      console.log(err);
    }

  }, 
  searchVerbs: async (req, res) => {
    let searchQuery = req.params.searchQuery
    let matchedVerbs = []
    try {
      const exactWord = await Verb.findOne({ word: searchQuery });
      matchedVerbs = await Verb.find({ word: new RegExp(`^${searchQuery}`) }).limit(5);
      if(exactWord) {
        matchedVerbs = [exactWord].concat(matchedVerbs.filter(x => x.word !== exactWord.word))
    
      }
      
      //typeahead for english verbs logic
      const english = await Translation.find({ "translation": { $eq: searchQuery } }).limit(5)
      if(english.length > 0) {
        matchedVerbs = english.concat(matchedVerbs)
       
      }
      res.json(matchedVerbs.slice(0,5))
        
      
     
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

  },
  getEnToEsRoot: async (req, res) => {
    let enWord = req.params.word
    try {
      const words = await Translation.aggregate([
        {
          $match: {
            "translation": enWord
          }
        },
        {
          $project: {
            word: 1
          }
        }
      ])
      if(words.length === 0)  res.status(404).json({ message: "not found" }) //if no send error
      else res.status(201).json(words)
     
    } catch (err) {
      res.status(500).json({ err });
    }

  }
}

