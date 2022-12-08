import React, {useState, useEffect} from 'react';


interface Props {
  dashId: string;
  grafUrl: string;
}
const Metrics = (props: Props) => {
  const [dash, setDash] = useState(props.dashId);
  const [grafUrl, setGrafUrl] = useState(props.grafUrl);

  useEffect(() => {
    setDash(props.dashId);
    setGrafUrl(props.grafUrl);
  },[dash, grafUrl]);
  

  return (
    <div>
      <div>Metrics</div>
      {props.dashId && <iframe src={`${props.grafUrl}d/${props.dashId}/docker-storm?orgId=1&refresh=5s&kiosk=tv`} width="1200" height="1600" frameBorder="0"></iframe>}
    </div>


  );
};
export default Metrics;