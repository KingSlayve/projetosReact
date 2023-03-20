//css
import './App.css';
//react
import {useCallback, useEffect,useState} from "react";
//data
import {wordsList} from "./data/words";
//componentes
import TelaInicial from './components/TelaInicial';
import Game from './components/Game';
import GameOver from './components/GameOver';

const estagios = [ //estagios do jogo
  {id: 1, nome: "start"},
  {id: 2, nome: "game"},
  {id: 3, nome: "end"}
]


function App() {
  
  const[gameStage, setGameStage] = useState(estagios[0].nome); //inicia no estagio start
  const[words] = useState(wordsList);

  const [escolhePalavra, setEscolhePalavra] = useState("")
  const[escolheCategoria, setEscolheCategoria] = useState("")
  const[letras, setLetras] = useState([]) 

  const [letrasEscolhidas, setLetrasEscolhidas] = useState([])
  const [letrasErradas, setLetrasErradas] = useState([])
  const [tentativas, setTentativas] = useState(3)
  const [pontuacao, setPontuacao] = useState(50)

  const escolherPalavraeCategoria = useCallback(() => {
    const categorias = Object.keys(words)
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)]
    console.log(categoria)
    const palavra = words[categoria][Math.floor(Math.random() * words[categoria].length)]
    console.log(palavra)

    return{palavra,categoria}
  }, [words])

  //iniciando o jogo
  const startGame = useCallback(() =>{
    clearLetterStages() //caso houver alguma letra ele reseta
    //escolhendo palavra e categoria
    const {palavra,categoria} = escolherPalavraeCategoria()

    //criando array de letras

    let letrasPalavra = palavra.split("")
    letrasPalavra = letrasPalavra.map((l)=>l.toLowerCase())

    setEscolhePalavra(palavra)
    setEscolheCategoria(categoria)
    setLetras(letrasPalavra)

    console.log(palavra,categoria)
    console.log(letrasPalavra)
    setGameStage(estagios[1].nome)
  }, [escolherPalavraeCategoria])

  //usuario escolhendo a letra
  const verificaLetra = (letra) => {
    const normalizedLetter = letra.toLowerCase()
    //checando se a letra ja foi ultilizadas
    if(letrasEscolhidas.includes(normalizedLetter) || letrasErradas.includes(normalizedLetter)){
      return
    }
    if(letras.includes(normalizedLetter)){
      setLetrasEscolhidas((actualLetrasEscolhidas) => [...actualLetrasEscolhidas, normalizedLetter,])
    } else{
      setLetrasErradas((actualLetrasErradas) => [...actualLetrasErradas, normalizedLetter,])
      setTentativas((actualTentativas)=> actualTentativas - 1)
    }
    
  }

  const clearLetterStages = () => {
    setLetrasEscolhidas([])
    setLetrasErradas([])
  }

  //checando o final
  useEffect(()=> {
    if(tentativas<=0){
      //resetandos todos os estagios
      clearLetterStages()
      setGameStage(estagios[2].nome)
    }
  },[tentativas])

  //checando condição de vitoria
  useEffect(()=> {
    const uniqueLetters = [... new Set(letras)] //cria um array com a palavra mas exclui as letras repetidas
    if(letrasEscolhidas.length === uniqueLetters.length){
      setPontuacao((actualPontuacao) => actualPontuacao += 100)
      startGame()
    }
    
  },[letrasEscolhidas, letras, startGame])

  //reinicia o jogo

  const reinicia = () => {
    setPontuacao(0)
    setTentativas(3)
    setGameStage(estagios[0].nome)
  }

  return (
    <div className="App">
      {gameStage === 'start' && <TelaInicial startGame={startGame}/>} {/* se a variavel estiver setada em start, chama o compnente TelaInicial */}
      {gameStage === 'game' && <Game verificaLetra={verificaLetra} escolhePalavra = {escolhePalavra} escolheCategoria={escolheCategoria} letras={letras} letrasEscolhidas={letrasEscolhidas} letrasErradas={letrasErradas} tentativas={tentativas} pontuacao={pontuacao}/>}
      {gameStage === 'end' && <GameOver reinicia={reinicia} pontuacao = {pontuacao}/>}
    </div>
  );
}

export default App;
