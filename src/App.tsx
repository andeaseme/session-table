import React from 'react';
import { otosenseTheme2022 } from '@otosense/components';
import { ThemeProvider } from '@mui/material/styles';

import './App.css';
import {Column} from "./Row";
import {mockListSessions, Session} from "./testData";
import {SessionTable} from "./Table";
import {cellDateTime, cellMW160} from "./tableStyles";
import {formatSessionTime} from './utility';

const data = mockListSessions();
const columns: Column[] = [
  {sx:cellDateTime, key: (s: Session) => formatSessionTime(+s.bt), label: 'Start Date'},
  {sx:cellDateTime, key: (s: Session) => formatSessionTime(+s.tt), label: 'End Date'},
  {sx:cellMW160, key: (s: Session) => `${(s.tt-s.bt) / 1e6}`, label: 'Duration (sec)'},
  {sx:cellMW160, key: 'sr', label: 'Sample Rate (Hz)'},
  {sx:cellMW160, key: 'bit_depth', label: 'Bit Depth'},
]


function App() {
  return (
    <ThemeProvider theme={otosenseTheme2022}>
      <SessionTable
        data={data}
        columns={columns}
        key={'ID'}
      />
    </ThemeProvider>
  );
}

export default App;
