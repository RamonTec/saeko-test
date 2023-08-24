import React, { useState, useEffect } from 'react';
import './App.css';
import { ActionGame } from './components/ActionGame';
import { HandleResult } from './components/HandleResult';

import svgPaper from './assets/paper.svg'
import svgRock from './assets/rock.svg'
import svgScissors from './assets/scissors.svg'

function App() {

  const [messageResult, setMessageResult] = useState<string>('');
  const [optionUser, setOptionUser] = useState<string | undefined>('');
  const [optionMachine, setOptionMachine] = useState<string | undefined>('');
  const [showDivider, setShowdivider] = useState<boolean>(true);
  const [counterUser, setCounterUser] = useState<number>(0);
  const [counterMachine, setCounterMachine] = useState<number>(0);

  const TIE = 0;
  const WIN = 1;
  const LOST = 2;

  const ROCK = "rock";
  const PAPER = "paper";
  const SCISSORS = "scissors";

  useEffect(() => {
    if (messageResult !== '') {
      let timer2: string | number | NodeJS.Timeout | undefined;
      const timer = setTimeout(() => {
        setShowdivider(false); // oculta el divisor nuevamente
        
        timer2 = setTimeout(() => {
          setOptionMachine('');
          setOptionUser('');
          setShowdivider(true); // Muestra el divisor nuevamente después de 2 segundos
        }, 2000);
      }, 2000); // Intervalo de 2 segundos

      return () => {
        clearTimeout(timer2);
        clearTimeout(timer);
      };
    }
  }, [messageResult]);

  const messageGame = (_value: string): void => {
    setMessageResult(_value);
  };

  const play = (_value: string): void => {

    const machineOption = calcMachineOption();
    const result = calcResult(_value, machineOption);

    switch (result) {
      case TIE:
        messageGame('Empate');
        break;
      case WIN:
        setCounterUser(prevState => prevState + 1);
        messageGame('Ganaste');
        break;
      case LOST:
        setCounterMachine(prevState => prevState + 1);
        messageGame('Perdiste');
        break;
    }
  };

  const calcMachineOption = (): string | undefined => {
    const number = Math.floor(Math.random() * 3);
    switch (number) {
      case 0:
        setOptionMachine(svgRock);
        return ROCK;
      case 1:
        setOptionMachine(svgPaper);
        return PAPER;
      case 2:
        setOptionMachine(svgScissors);
        return SCISSORS;
    }
  };

  const calcResult = (userOption: string, machineOption: string | undefined): number | undefined => {
    
    if (userOption === ROCK) setOptionUser(svgRock);
    if (userOption === PAPER) setOptionUser(svgPaper);
    if (userOption === SCISSORS) setOptionUser(svgScissors);

    if (userOption === machineOption) {
      return TIE;
    } else if (userOption === ROCK) {
      if (machineOption === PAPER) return LOST;
      if (machineOption === SCISSORS) return WIN;

    } else if (userOption === PAPER) {
      if (machineOption === SCISSORS) return LOST;
      if (machineOption === ROCK) return WIN;

    } else if (userOption === SCISSORS) {
      if (machineOption === ROCK) return LOST;
      if (machineOption === PAPER) return WIN;
    }
  };

  return (
    <>
      <header className="App-header">
        <div>
          <span>{counterUser}</span> <span>-</span> <span>{counterMachine}</span>
        </div>
        <h3>Marcador</h3>
      </header>

      <div className='Container-root-actions'>
        <ActionGame disabled={!showDivider} title='Selecciona una opción' player='Tu' onClickOption={play}/>
        
        <HandleResult 
          message={messageResult} 
          optionMachine={optionMachine} 
          optionUser={optionUser} 
          divider={showDivider}
        />

        <ActionGame disabled={true} title='' player='Computadora' onClickOption={play}/>
      </div>


    </>
  );
}

export default App;
