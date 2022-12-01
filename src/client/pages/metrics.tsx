import React from 'react';
import metricsIcon from '../../../resources/icons/metrics-icon.png';



interface Props {
  dashId: string;
}
const Metrics = (props: Props) => {

  

  return (
    <div>
      <div className="page-wrapper" id="metrics-inner-div">
        <div className="metrics page-inner-wrapper-div">
          <h2 className='page-title white-text'><span className="page-title-span">
            <img className="title-icon dark-icon light-icon" src={metricsIcon} alt="" />Metrics</span></h2>
          <iframe src={`http://localhost:3000/d/${props.dashId}/docker-storm?orgId=1&refresh=5s&kiosk=tv`} width="970" height="540" frameBorder="0"></iframe>
        </div>
      </div>
    </div>


  );
};
export default Metrics;