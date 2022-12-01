import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React, {useEffect, useState} from 'react';
import RenderViews from './RenderViews.jsx';

import 'whatwg-fetch';


import '../../resources/styles.css';


const App: React.FC = (): JSX.Element => {
  const [apiKey, setApiKey] = useState('');
  


  

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
      .then((result:any) => {
        setApiKey(result.ApiKey);
      });
  }
  
  useEffect(() => {
    intializeDashboard();
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/app/*' element={<RenderViews ApiKey={apiKey}/>}/>
      </Routes>
    </HashRouter>
  );
};

export default App;

