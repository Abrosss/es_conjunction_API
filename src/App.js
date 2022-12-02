
import './css/styles.css';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import YourSvg  from './assets/images/arrow.svg';
import {capitalizeFirstLetter} from './functions/functions'
function App() {
 
const [result, setResult] = useState([])
const [isLoaded, setIsLoaded] = useState(false)
const [loading, setLoading] = useState(false)
const [tableRequested, setTableRequested] = useState(false)
const [currentWord, setCurrentWord] = useState(null)
const [allWords, setAllWords] = useState([])
const [isRoot, setIsRoot] = useState(false)
console.log(result)
const input = useRef()

let pronouns = ['yo', 'tú', "él/ella/usted", 'nosotros/nosotras', 'vosotros/vosotras', 'ellos/ellas/ustedes']
let tenses = ['Present', 'Preterite', 'Imperfect', 'Conditional', 'Future']
console.log(result)
async function handleSubmit(e, word) {
 let root
  e.preventDefault()
  setIsLoaded(false)
  setLoading(true)
  await axios.get(`http://localhost:5000/admin/verbs/${word}`).then((response) => {
    setResult(response.data)
    if(response.data[0].meaning[0].tense === "Infinitive")
    {
      root = word
      setIsRoot(true)
    }
   
    else {
      root = response.data[0].meaning[0].infinitive
      setIsRoot(false)
    } 
  });
  await axios.get(`http://localhost:5000/admin/roots/${root}`).then((response) => {
    setAllWords(response.data)
    setIsLoaded(true)
    setLoading(false)
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
    <nav>

    </nav>
    <header>
      <h1>Spanish Verbs</h1>
    <form>
      <input ref={input} autoComplete='off' onChange={(e) => setCurrentWord(e.target.value) } placeholder='spanish word here' name='word'></input>
      <button onClick={(e) => handleSubmit(e, currentWord)}><img src={YourSvg}></img></button>
      </form>
    </header>

    <main>
    {loading &&
    <section className='table'>
<lord-icon
    src="https://cdn.lordicon.com/ekjuxqnh.json"
    trigger="loop"
    delay="2000"
    colors="primary:#6c63ff"
    style={{width:"50px",height:"50px", opacity: ".8"}}>
</lord-icon>
    </section>
    }
      {isLoaded && result.map(word => (
        <section className='table'>
          {!isRoot ?
           <p className='pronoun'>{capitalizeFirstLetter(word.meaning[0].performer)} <span className='selected'>{word.word}</span> </p> :
           <p className='pronoun dotted' onClick={() => setTableRequested(!tableRequested)} ><span className='selected'>{capitalizeFirstLetter(word.word)}</span> </p>
          }
       <p className='italic'>{word.meaning[0].translation}</p>
        
        { !isRoot ?
          
          <p>show conjugation for <span onClick={() => setTableRequested(!tableRequested)} className='dotted'>{word.meaning[0].infinitive} </span></p> :
          <p>show conjugation for <span onClick={() => setTableRequested(!tableRequested)} className='dotted'>{word.word} </span></p>
        }
        
 
        
      </section>
      ))
  
      
      }
      <section className='table'>
      <table>
      <tbody>
          <tr>
          <th></th>
          {isLoaded && tableRequested && tenses.map(tense => (
            <th>{tense}</th>
          ))}
          </tr>
          {isLoaded && tableRequested && pronouns.map(pronoun => (
          <tr>
            <td>{pronoun}</td>
            {tableRequested && tenses.map(tense => (
              <td className={currentWord === filter(pronoun, "Indicative", tense) ? "selected" : ""}>{allWords.length > 0 && filter(pronoun, "Indicative", tense)}</td>
            ) )}
          </tr>


          ))}
          
       </tbody>
         </table>
      </section>
     
      <script src="https://cdn.lordicon.com/fudrjiwc.js"></script>

    </main>
    </>
  );
}

export default App;
