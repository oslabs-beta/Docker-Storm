import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
createRoot(document.getElementById('root')).render(
// we took off strict mode so our components don't run use effect twice
// can easily turn it back on by re wrapping app and it won't really break too much
// take off when you actually care about checking true functionality 
_jsx(App, {}));
