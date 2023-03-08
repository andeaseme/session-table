import React, {useState} from 'react';

import { otosenseTheme2022 } from '@otosense/components';
import { ThemeProvider } from '@mui/material/styles';

import './App.css';
import {Column} from "./Row";
import {mockListSessions} from "./testData";
import {SessionTable} from "./Table";
import {cellDateTime, cellMW160} from "./tableStyles";
import {formatSessionTime, Operator, Session} from './utility';
import {FilterOption} from "./Filter";

const columns: Column[] = [
  {sx:cellDateTime, key: (s: Session) => formatSessionTime(+s.bt), label: 'Start Date'},
  {sx:cellDateTime, key: (s: Session) => formatSessionTime(+s.tt), label: 'End Date'},
  {sx:cellMW160, key: (s: Session) => `${(s.tt-s.bt) / 1e6}`, label: 'Duration (sec)'},
  {sx:cellMW160, key: 'sr', label: 'Sample Rate (Hz)'},
  {sx:cellMW160, key: 'bit_depth', label: 'Bit Depth'},
]


function App() {
  const [fromBt, setFromBt] = useState<number | null>(null);
  const [toTt, setToTt] = useState<number | null>(null);
  const [fromTt, setFromTt] = useState<number | null>(null);
  const [toBt, setToBt] = useState<number | null>(null);
  const [sr, setSr] = useState<number | null>(null);
  const [channels, setChannels] = useState<string[] | null>(null);
  const [channelsOp, setChannelsOp] = useState<Operator | null>(null);
  const [annotations, setAnnotations] = useState<string[] | null>(null);
  const [annotationsOp, setAnnotationsOp] = useState<Operator | null>(null);
  const [data, setData] = useState<Session[]>(mockListSessions());

  const filterOptions: FilterOption[] = [
    {
      label: 'Start Date',
      options: 'date',
      fromValue: fromBt,
      toValue: toBt,
      onChangeFrom: setFromBt,
      onChangeTo: setToBt,
    },
    {
      label: 'End Date',
      options: 'date',
      fromValue: fromTt,
      toValue: toTt,
      onChangeFrom: setFromTt,
      onChangeTo: setToTt,
    },
    {
      label: 'Sample Rate',
      options: [44100, 48000],
      value: sr,
      onChange: setSr,
    },
    {
      label: 'Channels',
      options: 'multilineOperator',
      linesValue: channels,
      onChangeLines: setChannels,
      operatorValue: channelsOp,
      onChangeOperator: setChannelsOp,
      operatorOptions: ['and', 'or']
    },
    {
      label: 'Annotations',
      options: 'multilineOperator',
      linesValue: annotations,
      onChangeLines: setAnnotations,
      operatorValue: annotationsOp,
      onChangeOperator: setAnnotationsOp,
      operatorOptions: ['and', 'or']
    }
  ]

  const submitFilters = () => {
    const chFilter = (channels != null && channelsOp != null) ? {names: channels, operator: channelsOp} : null;
    const anFilter = (annotations != null && annotationsOp != null) ? {names: annotations, operator: annotationsOp} : null;

    const sessions = mockListSessions({
      from_bt: fromBt,
      to_bt: toBt,
      from_tt: fromTt,
      to_tt: toTt,
      annotations: anFilter,
      device_ids: null,
      channels: chFilter,
      sr: sr,
    })
    setData(sessions);
  }
  const clearFilters = () => {
    [setFromBt, setToBt, setFromTt, setToTt, setSr, setChannels, setChannelsOp, setAnnotations, setAnnotationsOp,].forEach((setter) => setter(null));
  }


  return (
    <ThemeProvider theme={otosenseTheme2022}>
      <SessionTable
        data={data}
        columns={columns}
        key={'ID'}
        clearFilters={clearFilters}
        submitFilters={submitFilters}
        filterOptions={filterOptions}
      />
    </ThemeProvider>
  );
}

export default App;
