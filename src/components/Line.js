const dividerStyle = {
  background: 'black',
  height: '.2vh',
  marginTop: '1vh',
  marginBottom: '1vh',
}

// @TODO: style notes, at least So and Do, possibly possition L/R?
const Line = ({name, style, type, id, ...props}) => {
  const {showDos, showSos, shown, answer, setAnswer, showAll} = props
  const divider = (id % 2 === 0 ? dividerStyle : undefined)
  const show = (name === 'do' && showDos) || (name === 'so' && showSos) || showAll
  const toggler = { visibility: (show || shown === `${type}${id}`) ? 'visible' : 'hidden' }
  const offset = '10' // id * (type === 'bass' ? -2 : 2) + 10

  return (
    <div id={name} className="row" style={style || divider}>
      <p className="note" style={{...toggler, position: 'relative', left: `${offset}vw`}} onClick={() => setAnswer(answer => !answer)}>
        {answer || show ? name : '?'}
      </p>
    </div>
  )  
}

export default Line
