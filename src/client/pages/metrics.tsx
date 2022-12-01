import React from 'react';


interface Props {
  dashId: string;
}
const Metrics = (props: Props) => {

  

  return (
    <div>
      <div className="page-wrapper" id="metrics-inner-div">
        <div className="metrics page-inner-wrapper-div">
          <span className="page-title-span"><h2 className='page-title white-text'>Metrics</h2></span>
          <iframe src={`http://localhost:3000/d/${props.ApiKey}/docker-storm?orgId=1&refresh=5s&kiosk=tv`} width="970" height="540" frameBorder="0"></iframe>
        </div>
      </div>
    </div>


  );
};
export default Metrics;