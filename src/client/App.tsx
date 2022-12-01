import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React, {useEffect, useState} from 'react';
import RenderViews from './RenderViews.jsx';
import InitialSetup from './pages/initialSetup.jsx';
import '../../resources/styles.css';

const App: React.FC = (): JSX.Element => {
  const [apiKey, setApiKey] = useState('');
  const [pgUri, setPgUri] = useState('');


  async function intializeDashboard() {
    const jobsList = await fetch('/metric').then(data => {return data.json();});
    console.log('Jobs: ', jobsList);
  
    const panelList = await fetch('/metric/genPanel', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({panelTitles: jobsList.jobs, panelType: 'gauge', expr: '100 - (avg(irate(node_cpu_seconds_total{mode=\'idle\', job=<jobname>}[1m])) * 100)'}),
    })
      .then(data => {return data.json();});
  
    console.log('Panels:', panelList);
  
    const ramPanel = await fetch('/metric/genRamPanel').then(data => {return data.json();});
    panelList.panels.push(ramPanel);
  
    console.log('Updated Panels: ', panelList);
  
    fetch('/graf/init', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(panelList),
    })
      .then((data) => data.json())
      .then((result) => {
        setApiKey(result.ApiKey);
      });
  }
  
  useEffect(() => {
    
    if(!apiKey || !pgUri) return;
    console.log('render');
    intializeDashboard();
  }, [apiKey]);
  

  

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login 
          setApiKey={setApiKey}
          apiKey={apiKey}
          setPgUri={setPgUri}
          pgUri={pgUri}
        />}/>
        <Route path='/setup' element={<InitialSetup 
          setApiKey={setApiKey} 
          apiKey={apiKey} 
          setPgUri={setPgUri}
          pgUri={pgUri}
        />}/>
        <Route path='/app/*' element={<RenderViews ApiKey={apiKey}/>}/>
      </Routes>
    </HashRouter>
  );
};

export default App;




