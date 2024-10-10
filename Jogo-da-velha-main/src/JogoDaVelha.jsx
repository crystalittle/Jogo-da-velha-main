import { useState, useEffect } from 'react'
import './JogoDaVelha.css'

function JogoDaVelha() {
  const emptyBoard = Array(9).fill("");  

  const savedPlacar = JSON.parse(localStorage.getItem("placar"));
  const savedBoard = JSON.parse(localStorage.getItem("board"));


  const [board, setBoard] = useState(savedBoard || emptyBoard);
  const [currentPlayer, setCurrentPalyer] = useState("O");
  const [vencedor, setvencedor] = useState();
  const [placar, setPlacar] = useState(savedPlacar || { vitorias: 0, derrotas: 0, empates: 0 });
  const [dificuldade, setDificuldade] = useState("facil");

  const jogadaComputador2 = () => {
    // Após escolher a célula, adiciona o className 
    document.querySelector(`.celu:nth-child(${index + 1})`).classNameList.add("computer-move");
  };  

  const jogadaComputador = () => {
    if (dificuldade === "facil") {
      let posicoesVazias = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
      let jogadaAleatoria = posicoesVazias[Math.floor(Math.random() * posicoesVazias.length)];
      handleCeluClick(jogadaAleatoria);
    } else {
      
    }
  }  

  const handleCeluClick = (index) =>{
    if(vencedor) return null;

    if(board[index] !== "") return null;

    //troca jogador
    setBoard(board.map((item, itemindex) => itemindex === index ? currentPlayer : item));

    setCurrentPalyer(currentPlayer === "x" ? "O" : "x");

    
}

//possibilidades de ganhar
const vencedor1 = () => {
  const possibilidades = [
    [board[0], board[1], board[2]],
    [board[3], board[4], board[5]],
    [board[6], board[7], board[8]],

    [board[0], board[3], board[6]],
    [board[1], board[4], board[7]],
    [board[2], board[5], board[8]],

    [board[0], board[4], board[8]],
    [board[2], board[4], board[6]],
  ];
let acabou = false
  //mostra o vencedor
  possibilidades.forEach(celus =>{
    if(celus.every(celu => celu === "O")) {
      setvencedor("O");
      acabou = true
    }
    if(celus.every(celu => celu === "x")){
      acabou = true
      setvencedor("x");
    } 

    //placar do O
    if (vencedor === "O") {
      setPlacar((prevPlacar) => ({ ...prevPlacar, vitorias: prevPlacar.vitorias + 1 }));

      //placar do x
    } else if (vencedor === "x") {
      setPlacar((prevPlacar) => ({ ...prevPlacar, derrotas: prevPlacar.derrotas + 1 }));
      
      //placar de empate
    } else {
      setPlacar((prevPlacar) => ({ ...prevPlacar, empates: prevPlacar.empates + 1 }));
    }
  
  });

  if (!acabou) setvencedor(!board.some(s => s === '') ? 'E' : null)
}

//reiniciar jogo
const recomecar = () => {
  setCurrentPalyer("O");
  setBoard(emptyBoard);
  setvencedor(null);
}



useEffect(() => {
  localStorage.setItem("placar", JSON.stringify(placar));
  localStorage.setItem("board", JSON.stringify(board));
}, [placar, board]);

useEffect(() => {
  vencedor1()
}, [currentPlayer])

useEffect(() => {
  if (currentPlayer === 'x')
  jogadaComputador()
}, [currentPlayer])

  return (
    <main>
    <h1 className="title">Jogo da Velha</h1>

    <div className={`board ${vencedor ? "fim-de-jogo" : ""}`}>
      {board.map((item, index) => (
      <div key={index} className={`celu ${item}`}
        onClick={() => handleCeluClick(index)}
      >
        {item}
      </div>
      ))
    }
    </div>

    {vencedor &&
    <footer className="vencedor">

    {vencedor === "E" ?
      <span className="{vencedor}">Empatou!</span>
    :
      <span className="{vencedor}">
      {vencedor} Venceu!
      </span>
    }
      <button onClick={recomecar}>Recomeçar Jogo</button>
    </footer>
    }

  {/*mostra o placar */}
  <div className="placar">
    <p>Vitórias: {placar.vitorias}</p>
    <p>Derrotas: {placar.derrotas}</p>
    <p>Empates: {placar.empates}</p>
  </div>

  <button onClick={() => setPlacar({ vitorias: 0, derrotas: 0, empates: 0 })}>Zerar Placar</button>

  </main>
  );
}

export default JogoDaVelha
