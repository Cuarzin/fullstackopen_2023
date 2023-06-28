import React, { useState } from 'react';
import ReactDOM from 'react-dom';

/*
const Hello = (props) => {

  const bornYear = () =>{
    const yearNow = new Date().getFullYear()
    return yearNow - props.age
  }

  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>
        So you probably born in {bornYear()}
      </p>
      <br />
    </div>
  )
}
*/

const Display = (props) =>{
  return(
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>    
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseOrDecrease = (valor) => setCounter(counter + valor)
  const setToZero = () => setCounter(0)
  return (
    <div>
      <Display counter={counter}/>
      <Button 
      handleClick={() => increaseOrDecrease(1)}
      text="Suma"
      />
     <Button 
      handleClick={setToZero}
      text="Cero"
      />
      <Button 
      handleClick={() => increaseOrDecrease(-1)}
      text="Resta"
      />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))

