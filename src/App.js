import './App.css';
import axios from 'axios'
import {useState,useEffect} from 'react'

function App() {
  const [quiz,setQuiz] = useState()
  const [points,setPoints] = useState(0)
  const [turns,setTurns] = useState(0)
  const [disabled,setDisabled] = useState(false)
  const [index,setIndex] = useState(0)
  const [answer,setAnswer] = useState()
  const [question,setQuestion] = useState(1)
  
 

  function refreshPage() {
    window.location.reload(false);
  }


 useEffect(() => {
 
  axios.get('https://opentdb.com/api.php?amount=10&category=23&difficulty=medium')
  .then(res =>{
    setQuiz(res.data.results)
   
  })
  .catch(err=>{
    console.log(err)
    
  })

 }, []);

 useEffect(()=>{

   if(quiz && quiz.length > 0){
  setAnswer([...quiz[index].incorrect_answers,quiz[index].correct_answer].sort(()=>Math.random() - 0.5))
   }
 },[quiz,index])


 
 const handleClick = (e) => {
  
  setTimeout(() => setIndex(index +1), 2000); 
 
  setTimeout(() => setQuestion(question + 1), 2000); 
  if(e.target.innerText === quiz[index].correct_answer){
setPoints(points+1)
setTurns(turns + 1)

    e.target.style.background = 'green'
 
    
    
   setDisabled(true)
   setTimeout(() => setDisabled(false), 2000); 
  } else {
    setTurns(turns + 1)
   
  
 e.target.style.background = 'red'

    setDisabled(true)
   setTimeout(() => setDisabled(false), 2000); 
   
  }
 
 }

 const newQuiz = (e) =>{
  refreshPage()
}

 if(turns >= 9|| points >= 9){
   return (
     <div className='score'><h1>Well done</h1>
     <p>your score : {points}</p>
     <button onClick={newQuiz} className='button-28'>New Quiz</button>
     </div>
   )
   }
 
  return (
    <div className="App">
      <div className='grid'>
        <h3>question {question} / 10</h3>
<h1 className='question'>{quiz && quiz[index].question}</h1>
 {answer? answer.map(answers =>{
  return <button  disabled={disabled} className='button-28' onClick={handleClick} key={answers}>{answers}</button>
  
 }) : <></>
   
}
 </div>
    </div>

  );
}

export default App;