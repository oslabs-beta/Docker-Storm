import { HashRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login.jsx';
import React, { useEffect } from 'react';
import RenderViews from './RenderViews.jsx';
const App = () => {
    async function intializeDashboard() {
        const body = {
            panels: [
                { title: 'Ram Usage',
                    expression: '100 * (1 - ((avg_over_time(node_memory_MemFree_bytes[1m]) + avg_over_time(node_memory_Cached_bytes[1m]) + avg_over_time(node_memory_Buffers_bytes[1m])) / avg_over_time(node_memory_MemTotal_bytes[1m])))',
                    graphType: 'gauge'
                },
                { title: 'Manager 1 CPU Usage',
                    expression: '100 - (avg(irate(node_cpu_seconds_total{mode=\'idle\', job=\'Manager1\'}[1m])) * 100)',
                    graphType: 'gauge'
                },
                { title: 'Overall CPU Usage',
                    expression: '100 - (avg(irate(node_cpu_seconds_total{mode=\'idle\'}[1m])) * 100)',
                    graphType: 'gauge'
                }
            ]
        };
        await fetch('/graf/init', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(body),
        });
    }
    useEffect(() => {
        intializeDashboard();
    }, []);
    return (<HashRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/app/*' element={<RenderViews />}/>
      </Routes>
    </HashRouter>);
};
export default App;
