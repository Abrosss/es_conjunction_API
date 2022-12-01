
import './css/styles.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
function App() {
const [result, setResult] = useState([])
const [isLoaded, setIsLoaded] = useState(false)
const [word, setWord] = useState(null)
const [allWords, setAllWords] = useState([])
let pronouns = ['yo', 'tú', "él/ella/usted", 'nosotros/nosotras', 'vosotros/vosotras', 'ellos/ellas/ustedes']
let tenses = ['Present', 'Preterite', 'Imperfect', 'Conditional', 'Future']
console.log(result)
async function handleSubmit(e, word) {
 let root
  e.preventDefault()
  setIsLoaded(false)
  await axios.get(`http://localhost:5000/admin/verbs/${word}`).then((response) => {
    setResult(response.data)
    if(response.data[0].meaning[0].tense === "Infinitive")
    root = word
    else root = response.data[0].meaning[0].infinitive
  });
  await axios.get(`http://localhost:5000/admin/roots/${root}`).then((response) => {
    setAllWords(response.data)
    setIsLoaded(true)
  });

}

function filter(pronoun, mood, tense) {
  if(isLoaded) {
    let pronouns = []
    let word = {}
     allWords.filter(word => word.meaning.map(el => el.performer === pronoun && el.mood === mood && el.tense === tense ? pronouns.push({word:word.word, meaning: el}) : pronouns))
     
     return pronouns[0].word
  }
  
}
// function filterCurry(mood) {
//   if(isLoaded) {
//     let pronouns = []
//     return function(pronoun) {
//       return function(tense) {
//         allWords.filter(word => word.meaning.map(el => el.performer === pronoun && el.mood === mood && el.tense === tense ? pronouns.push({word:word.word, meaning: el}) : pronouns))
//         return pronouns[0].word
//       }
//         }
//   }
  
//     }
// const allIndicative = filterCurry('Indicative')
// const allSubjunctive = filterCurry('Subjunctive')
//  console.log(allIndicative('yo')('Present'))



  return (
    <>
    <header>

    </header>
    <main>
      <form>
      <input onChange={(e) => setWord(e.target.value) } placeholder='spanish word here' name='word'></input>
      <button onClick={(e) => handleSubmit(e, word)}>search</button>
      </form>
    </main>
    <section>
      {isLoaded && result.map(word => (
        <section className='table'>
        <p>Pronouns: {word.meaning[0].performer}</p>
        <p>Infinitive: {word.meaning[0].infinitive}</p>
        <p>Translation: {word.meaning[0].translation}</p>
      </section>
      ))
  
      
      }
      <section>
      <table>
      <tbody>
          <tr>
          <th></th>
          {isLoaded && tenses.map(tense => (
            <th>{tense}</th>
          ))}
          </tr>
          {isLoaded && pronouns.map(pronoun => (
          <tr>
            <td>{pronoun}</td>
            {isLoaded && tenses.map(tense => (
              <td className={word === filter(pronoun, "Indicative", tense) ? "selected" : ""}>{allWords.length > 0 && filter(pronoun, "Indicative", tense)}</td>
            ) )}
          </tr>


          ))}
          
       </tbody>
         </table>
      </section>
    </section>
    </>
  );
}

export default App;
