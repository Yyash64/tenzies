import Die from "./die";
import { useState, useRef,useEffect } from "react";
import Confetti from "react-confetti";
export default function App() {
  function generateAllNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        num: Math.ceil(Math.random() * 6),
        id: crypto.randomUUID(),
        isHeld: false,
      });
    }
    return newDice;
  } 
  function rollDice(){
    if(!gamewon)
    setDice(oldDice=>oldDice.map(die=>
      die.isHeld?
      die:
      {...die, num: Math.ceil(Math.random()*6)}
  ))
  else{
    setDice(generateAllNewDice())
  }
} 
  function hold(id){
    setDice(oldDice=>oldDice.map(die=>{
      return die.id===id?{...die,isHeld:!die.isHeld}:die;
    })
    )}
  const [dice, setDice] = useState(()=>generateAllNewDice());
    const buttonRef=useRef(null);
  // function handleClick() {
  //   setDice(generateAllNewDice());
  // }
  const gamewon=dice.every(die=>die.isHeld)&&dice.every(die=>die.num===dice[0].num)
  useEffect(()=>{
    if(gamewon){
      buttonRef.current.focus();
    }
  },[gamewon])
   
  const diceElements = dice.map(e => <Die id={e.id} num={e.num} isHeld={e.isHeld} hold={hold}/>);

  return (
    <main>
        {gamewon? <Confetti/>:null}
        <div aria-live="polite" className="sr-only">
          {gamewon?"Congratulations! You won!":"null"}
        </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        {gamewon?"New Game":"Roll"}
      </button>
    </main>
  );
}
 