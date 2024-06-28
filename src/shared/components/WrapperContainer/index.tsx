import { Box } from '@mui/material';
import React from 'react';

interface IWrapperContainer {
  children: React.ReactNode;
  moreStyle?: object;
}

const WrapperContainer = ({ children, moreStyle }: IWrapperContainer) => {
  return (
    <Box sx={{ width: '100%', p: '4.5rem', ...moreStyle }}>{children}</Box>
  );
};

export default WrapperContainer;
