import React, {useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {cacheData} from '../../types.js';
import { QueryClient, useQueryClient } from '@tanstack/react-query';


const InitialSetup = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['cache']) as cacheData;
  const setupInfo = useRef<HTMLFormElement>(null);
  const[currentApi, setCurrentApi] = useState(data.apiKey);
  const[currentGrafUrl, setCurrentGrafUrl] = useState(data.grafUrl);
  const[validInput, setValidInput] = useState(false);
  const navigate = useNavigate();



  useEffect(() => {
    if(data.apiKey && data.grafUrl) navigate('/app');
  }, []);

  const handleSubmit = () => {

    const grafUrl = (setupInfo.current?.['graf-url']?.value);
    const apiKey = (setupInfo.current?.['api-key']?.value);
    console.log(grafUrl, apiKey, 'USEREF DATA HERE');
    if(!grafUrl || !apiKey) {
      setValidInput(true);
      return;
    }
  

    const body = {
      apiKey: apiKey,
      grafUrl: grafUrl
    };
    
    queryClient.setQueryData(['cache'], {grafUrl, apiKey});
    console.log(data.apiKey, data.grafUrl, 'CACHED DATA HERE');

    fetch('/user/env', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body),
    }).then(() => {
      navigate('/app');
    });
  };

  const renderApiKey = () => {
    return (
      <div>
        Please enter your Grafana Api Key
        <input type='text' 
          placeholder='Grafana Api Key' 
          id='api-key'/>
      </div>
    );
  };

  const renderGrafUrl = () => {
    return (
      <div>
        <strong>Please enter your Grafana URL.</strong> <br></br> 
        Please enter in the form of http://localhost:XXXX/
         or http://[IP ADDRESS]/ or http://[URL]/ . <br></br>
        Please do not add anything after the final / .  
        <input type='text' 
          placeholder='GRAFANA URL' 
          id='graf-url'/>
      </div>
    );
  };

  return(
    <div>

      <form onSubmit={(e) => e.preventDefault()}
        ref={setupInfo}
      >
        {!data.apiKey && renderApiKey()}
        {!data.grafUrl && renderGrafUrl()}
        <button onClick={handleSubmit}>SUBMIT</button>
        {validInput && <div>Please fill out field(s) before submitting</div>}
      </form>
    </div>
  );
};

export default InitialSetup;