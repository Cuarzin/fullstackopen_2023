import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Button = (props) =>{
  
  if (props.text === "calc") {
    return (
      <button onClick={props.onClick}>Generate a random anecdote</button>
    )
  }

  if (props.text ==="votes"){
    return(
      <button onClick={props.onClick}>Votar</button>
    )
  }
}

const ShowHighVote = (props) => {  
  const anecdotes = props.anecdote

  if (props.started > 0)
  {
    return(
      <div>
        <h3>Anecdote with more votes:</h3>
        <p>{anecdotes[props.vote]}</p>
        

      </div>
    )
  }
  return (
    <h3>No votes yet</h3>
  )
}

const App = (props) =>{

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0})
  const [highPoints, sethighPoints] = useState(0)
  const [started, setStarted] = useState(0)
  
  const getRandNumber = () => {
    const randomNumber = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const newVote = () => {
    const pointsCopy = {...points}
    pointsCopy[selected] += 1
    setPoints(pointsCopy)
    highVote()
    setStarted(1)
  }
  
  const highVote = () => {
    const objectToArr = Object.values(points)
    const highValue = Math.max(...objectToArr)
    const keyHighVote = parseInt(Object.keys(points).find(key => points[key] === highValue))
    sethighPoints(keyHighVote)
  }
  
  return (
    <div>
      <h2>Random Anecdote:</h2>
      <p>{props.anecdotes[selected]}</p>
      <Button onClick={getRandNumber} text="calc"/>
      <Button onClick={newVote} text="votes"/>
      <p>This anecdote has: {points[selected]} Votes </p>
      <ShowHighVote vote={highPoints} anecdote={anecdotes} started={started}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding it  manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes}/>
  </React.StrictMode>
);
