import React, {useState, useEffect} from 'react';
import { renderMatches, useNavigate } from 'react-router-dom';

interface Props {
    setApiKey: (string) => void;
    setPgUri: (string) => void;
    apiKey: string;
    pgUri: string;
  
  }

const InitialSetup = (props: Props) => {
  const[currentApi, setCurrentApi] = useState(props.apiKey);
  const[currentPgUri, setCurrentPgUri] = useState(props.pgUri);


  // request to either create or edit the .env
  const handleSubmit = () => {
    const body = {
      apiKey: currentApi,
      pgUri: currentPgUri
    };

    fetch('/user/env', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body),
    });
  };


  // render when there is no graf api key in the .env file
  const renderApiKey = () => {
    return (
      <input type='text' 
        placeholder='Grafana Api Key' 
        onChange={input => setCurrentApi(input.target.value)} 
        value={currentApi}/>
    );
  };

  // render when there is no pg uri in .env file
  const renderPgUri = () => {
    return (
      <input type='text' 
        placeholder='PG URI' 
        onChange={input => setCurrentPgUri(input.target.value)} 
        value={currentPgUri}/>
    );
  };


  return(
    <div>

      <form onSubmit={(e) => e.preventDefault()}>
        {!props.apiKey && renderApiKey()}
        {!props.pgUri && renderPgUri()}
        <button onClick={handleSubmit}>SUBMIT</button>
      </form>




    </div>
  );
};

export default InitialSetup;