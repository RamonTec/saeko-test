import React from 'react';
import '../App.css';

import svgPaper from '../assets/paper.svg'
import svgRock from '../assets/rock.svg'
import svgScissors from '../assets/scissors.svg'

type ActionGameProps = {
  title?: string;
  player?: string;
  onClickOption: (_value: string) => void;
  disabled?: boolean;
}

export const ActionGame: React.FC<ActionGameProps> = ({
  title,
  player,
  onClickOption,
  disabled
}) => {
  return (
    <section className='Content-actions'>
      <span>{player}</span>
      <span>{title}</span>

      <button disabled={disabled} onClick={() => onClickOption('paper')}>
        <img src={svgPaper} alt="paper" />
      </button>

      <button disabled={disabled} onClick={() => onClickOption('rock')}>
        <img src={svgRock} alt="rock" />
      </button>

      <button disabled={disabled} onClick={() => onClickOption('scissors')}>
        <img src={svgScissors} alt="scissors" />
      </button>
    </section>
  );
}
