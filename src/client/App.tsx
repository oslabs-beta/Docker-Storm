import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import { Job, JobArray, Target, TargetIpArray, Role } from '../types.js';
import Signup from './pages/signup.jsx';
import React, {useEffect, useState, useContext, createContext} from 'react';
import RenderViews from './RenderViews.jsx';
import InitialSetup from './pages/initialSetup.jsx';
//import PgInit from './pages/pgInit.jsx';
import 'whatwg-fetch';


import '../../resources/styling/styles.css';



const App: React.FC = (): JSX.Element => {
  const [apiKey, setApiKey] = useState('');
  const [grafUrl, setGrafUrl] = useState('');
  const [dashId, setDashId] = useState('');
  const [targetsArr, setTargetsArr] = useState<Target[]>([]);
  const [openSignup, setOpenSignup] = useState(false);


  async function intializeDashboard() {
    const jobsList = await fetch('/metric').then(data => {return data.json();});
    const arr = makeTargetArray(jobsList.jobs, jobsList.targets);
    setTargetsArr(arr);

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
    panelList.panels.unshift(...staticPanels);

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
        console.log('RESULT HERE', result);
        setDashId(result.ApiKey);
      });
  }
  
  const makeTargetArray = (jobs: Job[], ips: string[]) : Target[] => {
    const result: Target[] = [];
    for(let i = 0; i < jobs.length; i++) {
      const obj: Target = {
        targets: [ips[i]],
        labels: {
          job: jobs[i].job,
          role: jobs[i].role
        }
      };
      result.push(obj);
    }
    return result;
  };
  
  useEffect(() => {
    console.log('useeffect ran');
    if(!apiKey || !grafUrl) return;
    console.log('in use effect', apiKey);
    
    intializeDashboard();
  }, [apiKey, grafUrl]);
  

  

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login 
          setApiKey={setApiKey}
          apiKey={apiKey}
          setGrafUrl={setGrafUrl}
          openSignup={openSignup}
          setOpenSignup={setOpenSignup}
        />}/>
        <Route path='/setup' element={<InitialSetup 
          setApiKey={setApiKey} 
          apiKey={apiKey} 
          setGrafUrl={setGrafUrl}
          grafUrl={grafUrl}
        />}/>
        <Route path='/app/*' 
          element={<RenderViews 
            targetsArr={targetsArr} 
            setTargetsArr={setTargetsArr} 
            dashId={dashId}
            grafUrl={grafUrl}
          />}/>
          
            
      </Routes>
      {openSignup && <Signup 
        setApiKey={setApiKey} 
        apiKey={apiKey} 
        openSignup={openSignup}
        setOpenSignup={setOpenSignup}
      />}
    </HashRouter>
  );
};

export default App;

