import React, {useState, useEffect} from 'react';
import {TextField, Container, Typography, Box, createStyles, Grid, Button } from '@mui/material';
import { Data } from 'electron/common';
import { domainToASCII } from 'url';
import {cacheData} from '../../types.js';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

interface Props {
  dashId: string;
}

const Metrics = (props: Props) => {
  const [dash, setDash] = useState(props.dashId);
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(['cache']) as cacheData;

  useEffect(() => {
    setDash(props.dashId);
  },[dash]);

  // const queryClient = new QueryClient({
  //   defaultOptions: {
  //     queries: {
  //       staleTime: Infinity,
  //     },
  //   },
  // });

  
  

  return (
    <>
      <Box>
        <Typography sx={{textAlign: 'left', margin: '10px 5%'}}><h2>Metrics</h2></Typography>
        <Box sx={{backgroundColor:'transparent', display: 'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', padding:'0px 20px'}}>
          <Box id="metrics-div" sx={{height:'80vh', display:'flex', width:'95%', justifyContent:'center', alignItems:'center', padding:'15px 15px', backgroundColor:'#111218', borderRadius:'30px'}}>
            {props.dashId && <iframe src={`${data.grafUrl}d/${props.dashId}/docker-storm?orgId=1&refresh=5s&kiosk=tv`} width="90%" height="90%" frameBorder="0"></iframe>}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default Metrics;