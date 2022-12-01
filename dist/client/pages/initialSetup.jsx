import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const InitialSetup = (props) => {
    const [currentApi, setCurrentApi] = useState(props.apiKey);
    const [currentPgUri, setCurrentPgUri] = useState(props.pgUri);
    const [validInput, setValidInput] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (props.apiKey && props.pgUri)
            navigate('/app');
    }, []);
    // request to either create or edit the .env
    const handleSubmit = () => {
        if (!currentApi || !currentPgUri) {
            setValidInput(true);
            return;
        }
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
        }).then(() => {
            navigate('/app');
        });
    };
    // render when there is no graf api key in the .env file
    const renderApiKey = () => {
        return (<input type='text' placeholder='Grafana Api Key' onChange={input => setCurrentApi(input.target.value)} value={currentApi}/>);
    };
    // render when there is no pg uri in .env file
    const renderPgUri = () => {
        return (<input type='text' placeholder='PG URI' onChange={input => setCurrentPgUri(input.target.value)} value={currentPgUri}/>);
    };
    return (<div>

      <form onSubmit={(e) => e.preventDefault()}>
        {!props.apiKey && renderApiKey()}
        {!props.pgUri && renderPgUri()}
        <button onClick={handleSubmit}>SUBMIT</button>
        {validInput && <div>Please fill out field(s) before submitting</div>}
      </form>




    </div>);
};
export default InitialSetup;
