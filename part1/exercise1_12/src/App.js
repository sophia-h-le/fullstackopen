import './App.css';
import React, { useState } from 'react'

const Anecdote = (props) => {
  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{props.text}</div>
    </>
  )
}

const Button = (props) => {
  return (
    <>
      <button onClick = {props.handleClick}>{props.text}</button>
    </>
  )
}

const Statistic = (props) => {
  return (
    <div>
      has {props.count} vote(s).
    </div>
  )
}

const MostVoted = (props) => {
  return(
    <>
      <h1>Anecdote with most votes</h1>
      <div>{props.text}</div>
      <Statistic count={props.count} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [allSelected, setAll] = useState([])
  const [allVotes, setVote] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0})
  const [maxVoteIndex, setMaxVote] = useState(0)
  
  const voteClick = () => {
    const copyAllVotes = {...allVotes}
    copyAllVotes[selected] += 1
    setVote(copyAllVotes)

    let index = 0
    let max = 0
    for (const [key, value] of Object.entries(copyAllVotes)) {
      if (value > max) {
        max = value
        index = key
      }
    }
    setMaxVote(index)
  }

  const randClick = () => {
    const length = anecdotes.length
    const rand = Math.floor(Math.random() * length)
    setSelected(rand)
    setAll(allSelected.concat(selected))
    // console.log(selected)
  }

  return (
    <>
      <Anecdote text={anecdotes[selected]} />
      <Statistic count={allVotes[selected]} />
      <Button handleClick={voteClick} text='vote' />
      <Button handleClick={randClick} text='next anecdote' />
      <MostVoted text={anecdotes[maxVoteIndex]} count={allVotes[maxVoteIndex]}/>
    </>
  )
}


export default App;
