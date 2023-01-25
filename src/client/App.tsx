import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import { Job, Target} from '../types.js';
import Signup from './pages/signup.jsx';
import React, {useEffect, useState} from 'react';
import RenderViews from './RenderViews.jsx';
import InitialSetup from './pages/initialSetup.jsx';
//import PgInit from './pages/pgInit.jsx';
import 'whatwg-fetch';
import {useQuery} from '@tanstack/react-query';
import {cacheData} from '../types.js';
import { useQueryClient } from '@tanstack/react-query';
import fetchFunction from './queries/cacheFetch.jsx';



import '../../resources/styling/styles.css';


// TODO: 

// make the functions modular in initdashboard.tsx
// hook up the signup functionality init db
// fix all the prop drilling




const App: React.FC = (): JSX.Element => {
  const [apiKey, setApiKey] = useState('');
  const [grafUrl, setGrafUrl] = useState('');
  const [dashId, setDashId] = useState('');
  const [targetsArr, setTargetsArr] = useState<Target[]>([]);
  const queryClient = useQueryClient();
  const [openSignup, setOpenSignup] = useState(false);
  const {data} = useQuery(['cache'], fetchFunction, {
    onSuccess: (data) => {
      if(data.apiKey && data.grafUrl) {
        intializeDashboard();
      }
    }
  });

  // makes our target array
  // sets dashboard id 
  // generates all the panels in graf
  async function intializeDashboard() {
    // const jobsList = await fetch('/metric').then(data => {return data.json();});
    // console.log(jobsList);
    // const arr = makeTargetArray(jobsList.jobs, jobsList.targets);
    // setTargetsArr(arr);

    const jobsList = await fetch('/metric').then(data => {return data.json();});
    console.log(jobsList);
    const arr = makeTargetArray(jobsList.jobs, jobsList.targets);
    queryClient.setQueryData(['cache'], {...queryClient.getQueryData(['cache']), targetsArray: arr});
  
    const panelList = await fetch('/metric/genPanel', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({panelTitles: jobsList.jobs, panelType: 'gauge', expr: '100 - (avg(irate(node_cpu_seconds_total{mode=\'idle\', job=<jobname>}[1m])) * 100)'}),
    })
      .then(data => {return data.json();});

    const staticPanels = await fetch('/metric/genStaticPanels').then(data => {return data.json();});
    panelList.panels.unshift(...staticPanels);
  
    fetch('/graf/init', {

      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(panelList),
    })
      .then((data) => data.json())
      .then((result) => {
        queryClient.setQueryData(['cache'], {...queryClient.getQueryData(['cache']), dashId: result.dashId});
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
  
  // useEffect(() => {
  //   fetch('/init');
  //   console.log('useeffect ran');
  //   if(!apiKey || !grafUrl) return;
    
  //   intializeDashboard();
  // }, [apiKey, grafUrl]);

  
  useEffect(() => {
    fetch('/init');
  }, []);

  return (

    <HashRouter>
      <Routes>
        <Route path='/' element={<Login 
        />}/>
        <Route path='/app/*' 
          element={<RenderViews 
            targetsArr={targetsArr} 
            setTargetsArr={setTargetsArr} 
            dashId={dashId}
            grafUrl={grafUrl}
          />}/>
          
            
      </Routes>
      
    </HashRouter>
  );
};

export default App;

