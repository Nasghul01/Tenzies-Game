import { useEffect, useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenZies] = useState(false)
  const [num , setNum] = useState(0)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value == firstValue)

    if (allHeld && allSameValue){
      setTenZies(true)
      setNum(0)
    }


  }, [dice])


  function allNewDice() {
    const newDice = []
    for (let i=0 ; i < 10 ; i++){
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()},
        ) 
    }
    return newDice
  }

  function generateNewDie () {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()}
    }

  function rollDice () {
    if(!tenzies){
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ?
        die : generateNewDie()
      }))
    }
    else {
      setTenZies(false)
      setDice(allNewDice())
    }
  }


  function holdDice (id, dicenum) {
    setNum(prevNum => prevNum === 0 ? dicenum : prevNum)
    setDice(oldDice => oldDice.map( die => {
      return die.id === id && die.value === num ? 
      {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElement = dice.map(die => (
    <Die key={die.id} 
    value={die.value} 
    isHeld= {die.isHeld}
    holdDice = {() => holdDice(die.id, die.value)}/>
  ))

  return (
      <main>
      {tenzies && <Confetti/>}
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same.
        Click each dice to hold the dice number.</p>
        <div className='dice-container'>
          {diceElement}
        </div>
        <button 
          onClick={rollDice} 
          className='roll-dice'>
        {tenzies? "New Game" : "Roll"}
        </button>
      </main>
  )
}

export default App
