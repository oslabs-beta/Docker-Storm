import React, {useState, useEffect} from 'react';
import {TextField, Container, Box, createStyles, Grid, Button } from '@mui/material';



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
    <Box sx={{ margin: '10px 50px'}}>
      <h2>Metrics</h2>
      <Box sx={{backgroundColor:'grey', width:'80vw', height:'80vh'}}>
      {props.dashId && <iframe src={`${props.grafUrl}d/${props.dashId}/docker-storm?orgId=1&refresh=5s&kiosk=tv`} width="1200" height="1600" frameBorder="0"></iframe>}
      </Box>
    </Box>


  );
};
export default Metrics;