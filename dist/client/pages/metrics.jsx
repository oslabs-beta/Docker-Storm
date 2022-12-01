import React from 'react';
const Metrics = (props) => {
    return (<div>
      <div>Metrics</div>
      <iframe src={`http://localhost:3000/d/${props.ApiKey}/docker-storm?orgId=1&refresh=5s&kiosk=tv`} width="1200" height="1600" frameBorder="0"></iframe>
    </div>);
};
export default Metrics;
