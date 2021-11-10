const dividerStyle = {
  background: 'black',
  height: '.2vh',
  marginTop: '1vh',
  marginBottom: '1vh',
}

// @TODO: style notes, at least So and Do, possibly possition L/R?
const Line = ({name, style, type, id, ...props}) => {
  const {showDos, showSos, shown, answer, setAnswer} = props
  const divider = (id % 2 === 0 ? dividerStyle : undefined)
  const show = (name === 'do' && showDos) || (name === 'so' && showSos)
  const toggler = { visibility: (show || shown === `${type}${id}`) ? 'visible' : 'hidden' }

  return (
    <div id={name} className="row" style={style || divider}>
      <p className="note" style={{...toggler, position: 'relative', left: '10vh'}} onClick={() => setAnswer(answer => !answer)}>
        {answer || show ? name : '?'}
      </p>
    </div>
  )  
}

export default Line
