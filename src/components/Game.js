import './Game.css';
import {useCallback, useRef,useState} from "react";

const Game = ({verificaLetra, escolhePalavra, escolheCategoria, letras, letrasEscolhidas, letrasErradas, tentativas, pontuacao}) => {
  
  const [letradig, setLetradig] = useState("") //variavel que vai receber a letra digitada pelo usuario
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    verificaLetra(letradig)
    setLetradig("")
    letterInputRef.current.focus()
  }
  return (
    <div className="game">
      <p className="points">
        <span>Pontuação: {pontuacao}</span>
      </p>
      <h1>Advinhe a palavra:</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{escolheCategoria}</span>
      </h3>
      <p>Voce ainda tem {tentativas} tentativas(s)</p>
      <div className="wordContainer">
        {letras.map((letra,i)=> (
          letrasEscolhidas.includes(letra) ? (
            <span key = {i} className="letter">{letra}</span>
          ) : (
            <span key = {i} className="quadradoBranco"></span>
          )
        ))}
      </div>
      <div className="letterConteiner">
        <p>Tente advinhar uma letra da palavra: </p>
        <form onSubmit={handleSubmit}>
          <input type="text" name='letter' maxLength="1" required onChange={(e) => setLetradig(e.target.value)} value={letradig} ref={letterInputRef}/>
          <button>Jogar!</button>
        </form>
      </div>
      <div className="wrongLettersContainer">
        <p>Letras ja ultilizadas</p>
        {letrasErradas.map((letter, i)=> (
          <span key={i}>{letter}</span>
        ))}
      </div>
    </div>
  )
}

export default Game