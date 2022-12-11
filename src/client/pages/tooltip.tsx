import * as React from 'react';
import {Help} from '@mui/icons-material/';
import {IconButton, Tooltip} from '@mui/material';

interface Props {
  text: string;
}

export default function BasicTooltip(props: Props) {
  return (
    <Tooltip placement="top-start" title={props.text}>
      <IconButton>
        <Help />
      </IconButton>
    </Tooltip>
  );
} 