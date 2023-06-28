import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const Display = ({ number }) => <div>Contador: {number}</div>


const Button = ({ handleClick, text }) => <button onClick={handleClick}> {text} </button>

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter +1)
  const setZero = () => setCounter(0)
  const decreaseByOne = () => setCounter(counter - 1)

   return (
    <div>
      <Display number={counter}/>
      <Button text ={"Plus One"} handleClick={increaseByOne}/>
      <Button text ={"Set Zero"} handleClick={setZero}/>
      <Button text ={"Minus One"} handleClick={decreaseByOne}/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
