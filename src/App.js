import './App.css'
import Line from './components/Line'
import { useEffect, useState } from 'react'

const clef = {
  position: 'absolute', 
  height: '100%', 
  width: 150, 
  left: 0, 
  margin: 'auto 0'
}
const staff = {
  position: 'relative', 
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 20, 
  marginRight: 20
}

const notes = [
  {char: 'd', name: 'do'}, 
  {char: 'r', name: 'ra'}, 
  {char: 'm', name: 'mi'}, 
  {char: 'f', name: 'fa'}, 
  {char: 's', name: 'so'},
  {char: 'l', name: 'la'},
  {char: 't', name: 'ti'},
]


const App = () => {
  const height = 12

  const keyTrigger = (event) => {
    if (event.repeat) return false
    if (event.shiftKey) {
      setAnswer(false)
      const whichBar = ['treble', 'bass'][Math.floor(Math.random() * 2)]
      const whichId = Math.floor(Math.random() * height)
      const randomNote = whichId === 0 ? 'middle0' : `${whichBar}${whichId}`  
      setShown(randomNote)
    }
    if (event.keyCode === 191) {
      setAnswer(answer => !answer)
    }
  }

  const [shown, setShown] = useState()
  const [answer, setAnswer] = useState(false)
  const [showDos, setShowDos] = useState(false)
  const [showSos, setShowSos] = useState(false)

  const state = {shown, answer, showDos, showSos, setAnswer}

  useEffect(() => {
    document.addEventListener("keydown", (e) => keyTrigger(e))
    return document.removeEventListener("keydown", (e) => keyTrigger(e))
  }, [])

  const barBuilder = ({ height, type }) => {
    const array = {
      treble: notes,
      bass: [notes[0], ...notes.slice(1, notes.length).reverse()],
    }
    let rows = []
    for (let i=1; i < height; i++) { 
      rows.push(<Line {...array[type][i % notes.length]} key={i} id={i} type={type} {...state} />)
    }
    return rows
  }

  const dotted = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2r9//38gYGAEESAAEGAAasgJOgzOKCoAAAAASUVORK5CYII=')"

  return (
    <div className="App">
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center', margin: '10px auto' }}>
        <span style={{ background: 'yellow', marginRight: 10}}>press <b>Shift</b> to change the note</span>
        <button onClick={()=>setShowDos(showDos => !showDos)}>toggle Dos</button>
        <button onClick={()=>setShowSos(showSos => !showSos)}>toggle Sos</button>
        <span style={{ background: 'yellow', marginLeft: 10}}>press <b>?</b> to reveal the answer</span>
      </div>
      <div id="treble" style={{...staff, flexDirection: 'column-reverse'}}>
        <img src="/treble-clef.svg" style={clef} alt="treble-clef" />
        {barBuilder({height, type: 'treble'}).map((bar) => bar)}
      </div>
      
      <Line {...notes[0]} id={0} type="middle" style={{background: dotted}} {...state} />

      <div id="bass" style={staff}>
        <img src="/bass-clef.svg" style={clef} alt="treble-clef" />
        {barBuilder({height, type: 'bass'}).map((bar) => bar)}
      </div>
    </div>
  )
}

export default App;
