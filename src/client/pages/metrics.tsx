import React from 'react';


interface Props {
  dashId: string;
}
const Metrics = (props: Props) => {

  

  return (
    <div>
      <div>Metrics</div>
      <iframe src={`http://localhost:3000/d/${props.dashId}/docker-storm?orgId=1&refresh=5s&kiosk=tv`} width="1200" height="1600" frameBorder="0"></iframe>
    </div>


  );
};
export default Metrics;