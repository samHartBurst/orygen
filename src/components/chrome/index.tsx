import React, { FunctionComponent } from 'react';
import { EuiProvider } from '@elastic/eui';
import Header from './header';

const Chrome: FunctionComponent = ({ children }) => {
  return (
    <EuiProvider colorMode="light">
      <Header />
      <div style={{ background: 'white' }}>{children}</div>
    </EuiProvider>
  );
};

export default Chrome;
