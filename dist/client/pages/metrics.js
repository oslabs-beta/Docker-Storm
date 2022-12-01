import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Metrics = (props) => {
    return (_jsxs("div", { children: [_jsx("div", { children: "Metrics" }), _jsx("iframe", { src: `http://localhost:3000/d-solo/${props.ApiKey}/test?orgId=1&refresh=5s&panelId=0`, width: "450", height: "200", frameBorder: "0" }), _jsx("iframe", { src: `http://localhost:3000/d-solo/${props.ApiKey}/test?orgId=1&refresh=5s&panelId=1`, width: "900", height: "400", frameBorder: "0" }), _jsx("iframe", { src: `http://localhost:3000/d-solo/${props.ApiKey}/test?orgId=1&refresh=5s&panelId=2`, width: "450", height: "200", frameBorder: "0" }), _jsx("iframe", { src: `http://localhost:3000/d-solo/${props.ApiKey}/test?orgId=1&refresh=5s&panelId=3`, width: "450", height: "200", frameBorder: "0" })] }));
};
export default Metrics;
