import './GameOver.css'

const GameOver = ({reinicia, pontuacao}) => {
  return (
    <div>
      <h1>Fim de jogo!</h1>
      <h2>A sua pontuação foi: <span>{pontuacao}</span></h2>
      <button onClick={reinicia}>Resetar jogo</button>
    </div>
  )
}

export default GameOver