import { useEffect, useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} vote{votes > 1 ? 's' : ''}</p>
    </>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))
  const [mostVoted, setMostVoted] = useState(-1)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const handleSelect = () => {
    const randomNumber = Math.floor(Math.random() * 8)
    setSelected(randomNumber)
  }

  const handleVote = () => {
    let newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  useEffect(() => {
    if (Math.max(...votes) === 0) {
      return
    }

    const mostVoted = votes.indexOf(Math.max(...votes))

    setMostVoted(mostVoted)
  }, [votes])

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button text="vote" onClick={handleVote} />
      <Button text="next anecdote" onClick={handleSelect} />
      <h1>Anecdote with most votes</h1>
      {mostVoted !== -1 && <Anecdote anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]} />}
    </div>
  )
}

export default App