import './App.css'
import Line from './components/Line'
import { useEffect, useState } from 'react'

const staffStyles = {
  position: 'relative', 
  display: 'flex',
  flexDirection: 'column',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  backgroundSize: 'auto 90%',
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
  const steps = 12

  const [shown, setShown] = useState()
  const [answer, setAnswer] = useState(false)
  const [showDos, setShowDos] = useState(false)
  const [showSos, setShowSos] = useState(false)
  const [showAll, setShowAll] = useState(false)
  const [lastNote, setLastNote] = useState()

  const state = {shown, answer, showDos, showSos, setAnswer, showAll}

  const keyTrigger = (event) => {
    if (event.repeat) return false

    if (event.shiftKey) {
      setAnswer(false)
      const whichBar = ['treble', 'bass'][Math.floor(Math.random() * 2)]

      // @TODO: don't select Do or So if they're shown
      let whichId
      do { whichId = Math.floor(Math.random() * steps) } 
      while (whichId === lastNote)
      setLastNote(whichId)

      const randomNote = whichId === 0 ? 'middle0' : `${whichBar}${whichId}`  
      setShown(randomNote)
      console.log({ whichId, lastNote, whichBar, randomNote })
    }

    if (event.keyCode === 191) {
      console.log({ lastNote, setAnswer, answer })
      setAnswer(answer => !answer)
    }
  }


  useEffect(() => {
    document.addEventListener("keydown", (e) => keyTrigger(e))
    return document.removeEventListener("keydown", (e) => keyTrigger(e))
  }, [])

  const barBuilder = ({ steps, type }) => {
    const array = {
      treble: notes,
      bass: [notes[0], ...notes.slice(1, notes.length).reverse()],
    }
    let rows = []
    for (let i=1; i < steps; i++) { 
      rows.push(<Line {...array[type][i % notes.length]} key={i} id={i} type={type} {...state} />)
    }
    return rows
  }

  const dotted = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABZJREFUeNpi2r9//38gYGAEESAAEGAAasgJOgzOKCoAAAAASUVORK5CYII=')"

  return (
    <div className="App" style={{ height: '100vh' }}>
      <Menu setShowDos={setShowDos} setShowSos={setShowSos} setShowAll={setShowAll} />

      <div id="treble" style={{...staffStyles, backgroundImage: "url('/treble-clef.svg')", flexDirection: 'column-reverse'}}>
        {barBuilder({steps, type: 'treble'}).map((bar) => bar)}
      </div>

      <Line {...notes[0]} id={0} type="middle" style={{background: dotted, height: '.5vh'}} {...state} />

      <div id="bass" style={{...staffStyles, backgroundImage: "url('/bass-clef.svg')", backgroundSize: 'auto 55%'}}>
        {barBuilder({steps, type: 'bass'}).map((bar) => bar)}
      </div>
    </div>
  )
}

const Menu = ({ setShowDos, setShowSos, setShowAll }) => (
  <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', margin: '3vh 1vh' }}>
  <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
    <span style={{ background: 'yellow', padding: '1%' }}>press <b>Shift</b> to change the note</span>
    &nbsp;&lt;&gt;&nbsp;
    <span style={{ background: 'yellow', padding: '1%' }}>press <b>?</b> to reveal the answer</span>
  </div>
  <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: '1vh' }}>
    <button onClick={()=>{
      setShowAll(false)
      setShowDos(value => !value)
    }}>toggle Dos</button>
    &nbsp;•&nbsp;
    <button onClick={()=>{
      setShowAll(false)
      setShowSos(value => !value)
    }}>toggle Sos</button>
    &nbsp;•&nbsp;
    <button onClick={()=>setShowAll(value => !value)}>toggle All</button>
  </div>
  </div>
)


export default App;
