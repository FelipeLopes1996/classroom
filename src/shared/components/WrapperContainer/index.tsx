import { Box } from '@mui/material';
import React from 'react';

interface IWrapperContainer {
  children: React.ReactNode;
  moreStyle?: object;
}

const WrapperContainer = ({ children, moreStyle }: IWrapperContainer) => {
  return (
    <Box sx={{ width: '100%', p: '5.3rem', ...moreStyle }}>{children}</Box>
  );
};

export default WrapperContainer;
