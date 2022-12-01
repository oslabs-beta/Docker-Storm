import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Routes, Route, Link } from 'react-router-dom';
import Settings from './pages/settings.jsx';
import Metrics from './pages/metrics.jsx';
import Swarms from './pages/swarms.jsx';
import Users from './pages/users.jsx';
const RenderViews = (props) => {
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "DOCKER STORM" }), _jsxs("div", { className: "navbar", children: [_jsx("div", { className: "links", children: _jsxs("ul", { children: [_jsx("li", { children: _jsx(Link, { to: '/app/settings', children: _jsx("p", { children: "Settings" }) }) }), _jsx("li", { children: _jsx(Link, { to: '/app/users', children: _jsx("p", { children: "Users" }) }) }), _jsx("li", { children: _jsx(Link, { to: '/app/swarms', children: _jsx("p", { children: "Swarms" }) }) }), _jsx("li", { children: _jsx(Link, { to: '/app/metrics', children: _jsx("p", { children: "Metrics" }) }) }), _jsx("li", { children: _jsx(Link, { to: '/', children: _jsx("p", { children: "Logout" }) }) })] }) }), _jsxs(Routes, { children: [_jsx(Route, { path: '/settings', element: _jsx(Settings, {}) }), _jsx(Route, { path: '/metrics', element: _jsx(Metrics, { ApiKey: props.ApiKey }) }), _jsx(Route, { path: '/users', element: _jsx(Users, {}) }), _jsx(Route, { path: '/swarms', element: _jsx(Swarms, {}) })] })] })] }));
};
export default RenderViews;
