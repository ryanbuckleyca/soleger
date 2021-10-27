const baseStyle = {
  background: 'grey',
  height: 2,
  marginTop: 10,
  marginBottom: 10,
}

const Line = ({name, style, type, id, ...props}) => {
  const {showDos, showSos, shown, answer, setAnswer} = props
  const divider = (id % 2 === 0 ? baseStyle : undefined)
  const show = (name === 'do' && showDos) || (name === 'so' && showSos)
  const toggler = { visibility: (show || shown === `${type}${id}`) ? 'visible' : 'hidden'}
  return (
    <div id={name} className="row" style={style || divider}>
      <p className="note" style={toggler} onClick={() => setAnswer(answer => !answer)}>
        {answer || show ? name : '?'}
      </p>
    </div>
  )  
}

export default Line
