import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React, {useEffect, useState} from 'react';
import RenderViews from './RenderViews.jsx';

const App: React.FC = (): JSX.Element => {
  const [apiKey, setApiKey] = useState('');
  

  function intializeDashboard() {
    const body = {
      panels : [
        {title: 'Ram Usage',
          expression: '100 * (1 - ((avg_over_time(node_memory_MemFree_bytes[1m]) + avg_over_time(node_memory_Cached_bytes[1m]) + avg_over_time(node_memory_Buffers_bytes[1m])) / avg_over_time(node_memory_MemTotal_bytes[1m])))',
          graphType: 'gauge'
        },

        {title: 'Ram Usage Line Graph',
          expression: '100 * (1 - ((avg_over_time(node_memory_MemFree_bytes[1m]) + avg_over_time(node_memory_Cached_bytes[1m]) + avg_over_time(node_memory_Buffers_bytes[1m])) / avg_over_time(node_memory_MemTotal_bytes[1m])))',
          graphType: 'line'
        },
        
        {title: 'Manager 1 CPU Usage',
          expression: '100 - (avg(irate(node_cpu_seconds_total{mode=\'idle\', job=\'Manager1\'}[1m])) * 100)',
          graphType: 'gauge'
        },
      
        {title: 'Overall CPU Usage',
          expression: '100 - (avg(irate(node_cpu_seconds_total{mode=\'idle\'}[1m])) * 100)',
          graphType: 'gauge'
        },
      ]
    };
    fetch('/graf/init', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(body),
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
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/app/*' element={<RenderViews ApiKey={apiKey}/>}/>
      </Routes>
    </HashRouter>
  );
};

export default App;