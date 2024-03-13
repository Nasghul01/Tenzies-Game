import { useEffect, useState } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'

function App() {

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenZies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value == firstValue)

    if (allHeld && allSameValue){
      setTenZies(true)
      console.log("you won")
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
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ?
      die : generateNewDie()
    }))
  }


  function holdDice (id) {
    setDice(oldDice => oldDice.map( die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElement = dice.map(die => (
    <Die key={die.id} 
    value={die.value} 
    isHeld= {die.isHeld}
    holdDice = {() => holdDice(die.id)}/>
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
