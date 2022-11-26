import React from 'react';


// interface Props {
//   ApiKey: string;
// }
const Metrics = ({ApiKey}) => {

  

  return (
    <div>
      <div>Metrics</div>
      <iframe src={`http://localhost:3000/d-solo/${ApiKey}/test?orgId=1&refresh=5s&panelId=0`} width="450" height="200" frameBorder="0"></iframe>
      <iframe src={`http://localhost:3000/d-solo/${ApiKey}/test?orgId=1&refresh=5s&panelId=1`} width="450" height="200" frameBorder="0"></iframe>
      <iframe src={`http://localhost:3000/d-solo/${ApiKey}/test?orgId=1&refresh=5s&panelId=2`} width="450" height="200" frameBorder="0"></iframe>
    </div>


  );
};
export default Metrics;