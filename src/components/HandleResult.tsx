import React from 'react';
import '../App.css';

type TypeProps = {
  message?: string;
  optionMachine?: string;
  optionUser?: string
  divider: boolean
}

export const HandleResult: React.FC<TypeProps> = ({
  message,
  optionMachine,
  optionUser,
  divider,
}) => {

  return (
    <>

      {
        divider ? (
          <>
            { optionUser !== '' ? <img width={100} height={100} src={optionUser} alt="user" /> : null }
            <div className='Divider-content'></div>
            { optionMachine !== '' ? <img width={100} height={100} src={optionMachine} alt="user" /> : null }
          </>
        ) : (
          <>
            <h1>{message}</h1>
          </>
        )
      }
    </>
  );
}

