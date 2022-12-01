import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React, {useEffect, useState} from 'react';
import RenderViews from './RenderViews.jsx';
import '../../resources/styles.css';
import Background from '../../resources/Background.png';


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
      .then((result) => {
        setApiKey(result.ApiKey);
      });
  }
  
  useEffect(() => {
    intializeDashboard();
  }, []);

  return (
    <HashRouter>
      <div id ="background-div" style={{ backgroundImage: `url(${Background})`}}>
      <Routes >
        <Route path='/' element={<Login />}/>
        <Route path='/app/*' element={<RenderViews ApiKey={apiKey}/>}/>
      </Routes>
      </div>
    </HashRouter>
  );
};

export default App;



// const body = {
//   panels : [
//     {title: 'Ram Usage',
//       expression: '100 * (1 - ((avg_over_time(node_memory_MemFree_bytes[1m]) + avg_over_time(node_memory_Cached_bytes[1m]) + avg_over_time(node_memory_Buffers_bytes[1m])) / avg_over_time(node_memory_MemTotal_bytes[1m])))',
//       graphType: 'gauge'
//     },

//     {title: 'Ram Usage Line Graph',
//       expression: '100 * (1 - ((avg_over_time(node_memory_MemFree_bytes[1m]) + avg_over_time(node_memory_Cached_bytes[1m]) + avg_over_time(node_memory_Buffers_bytes[1m])) / avg_over_time(node_memory_MemTotal_bytes[1m])))',
//       graphType: 'line'
//     },
        
//     {title: 'Manager 1 CPU Usage',
//       expression: '100 - (avg(irate(node_cpu_seconds_total{mode=\'idle\', job=\'Manager1\'}[1m])) * 100)',
//       graphType: 'gauge'
//     },
      
//     {title: 'Overall CPU Usage',
//       expression: '100 - (avg(irate(node_cpu_seconds_total{mode=\'idle\'}[1m])) * 100)',
//       graphType: 'gauge'
//     },
//   ]
// };