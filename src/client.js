import 'regenerator-runtime/runtime';
import React from 'react';
import {render} from 'react-dom';
import {ExperimentsProvider} from 'wix-experiments-react';
import App from './App';

const experiments = window.__EXPERIMENTS__;

render(
  <ExperimentsProvider options={{experiments}}>
    <App/>
  </ExperimentsProvider>,
  document.getElementById('root')
);
