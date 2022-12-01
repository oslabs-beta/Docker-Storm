import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React, {useEffect, useState} from 'react';
import RenderViews from './RenderViews.jsx';
import InitialSetup from './pages/initialSetup.jsx';


import '../../resources/styles.css';
import Background from '../../resources/Background.png';




const App: React.FC = (): JSX.Element => {
  const [apiKey, setApiKey] = useState('');
  const [pgUri, setPgUri] = useState('');
  const [dashId, setDashId] = useState('');


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

    const staticPanels = await fetch('/metric/genStaticPanels').then(data => {return data.json();});
    console.log('We made it!: ', staticPanels);
    panelList.panels.push(...staticPanels);

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
        setDashId(result.dashId);
      });
  }
  
  useEffect(() => {
    console.log('useeffect ran');
    if(!apiKey || !pgUri) return;
    console.log('in use effect', apiKey);
    
    intializeDashboard();
  }, [apiKey]);
  

  

  return (
    <HashRouter>
      <div id ="background-div" style={{ backgroundImage: `url(${Background})`}}>
      <Routes >
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
        <Route path='/app/*' element={<RenderViews dashId={dashId}/>}/>
      </Routes>
      </div>
    </HashRouter>
  );
};

export default App;

