import { useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'

function App() {

  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const newDice = []
    for (let i=0 ; i < 10 ; i++){
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: true,
        id: nanoid()},
        ) 
    }
    return newDice
  }

  function rollDice () {
    setDice(allNewDice())
  }

  const diceElement = dice.map(die => (
    <Die key={die.id} 
    value={die.value} 
    isHeld= {die.isHeld}/>
  ))

  return (
    <>
      <main>
        <div className='dice-container'>
          {diceElement}
        </div>
        <button onClick={rollDice} className='roll-dice'>Roll</button>
      </main>
    </>
  )
}

export default App
