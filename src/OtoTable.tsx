import React, { useEffect, useState } from 'react'
import { otosenseTheme2022 } from '@otosense/components'
import { ThemeProvider } from '@mui/material/styles'

import { type Column, SessionTable } from './Table'
import { formatSessionTime, type Operator, type Optional, type Session } from './utility'
import { type FilterOption } from './Filter'
import { cellDateTime, cellMW160 } from './tableStyles'
import {
  type PaginationOptions,
  type SessionFilterOptions,
  type SessionSortOptions
} from './testData'

interface OtoTableProps {
  listSessions: (
    filter: Optional<SessionFilterOptions>,
    sort: Optional<SessionSortOptions>,
    pagination: Optional<PaginationOptions>
  ) => Session[]
}

const columns: Column[] = [
  {
    label: 'Start Date',
    sx: cellDateTime,
    key: (s: Session) => formatSessionTime(+s.bt),
    orderBy: 'bt'
  },
  {
    label: 'End Date',
    sx: cellDateTime,
    key: (s: Session) => formatSessionTime(+s.tt),
    orderBy: 'tt'
  },
  { label: 'Duration (sec)', sx: cellMW160, key: (s: Session) => `${(s.tt - s.bt) / 1e6}` },
  { label: 'Sample Rate (Hz)', sx: cellMW160, key: 'sr', orderBy: 'sr' },
  { label: 'Bit Depth', sx: cellMW160, key: 'bit_depth' }
]

export const OtoTable = (props: OtoTableProps): JSX.Element => {
  const [fromBt, setFromBt] = useState<number | null>(null)
  const [toTt, setToTt] = useState<number | null>(null)
  const [fromTt, setFromTt] = useState<number | null>(null)
  const [toBt, setToBt] = useState<number | null>(null)
  const [sr, setSr] = useState<number | null>(null)
  const [channels, setChannels] = useState<string[] | null>(null)
  const [channelsOp, setChannelsOp] = useState<Operator | null>(null)
  const [annotations, setAnnotations] = useState<string[] | null>(null)
  const [annotationsOp, setAnnotationsOp] = useState<Operator | null>(null)
  const [rowsPerPage, setRowsPerPage] = useState<number>(50)
  const [page, setPage] = useState<number>(0)
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')
  const [orderBy, setOrderBy] = useState<string>('bt')
  const [data, setData] = useState<Session[]>([])

  const getSessions = (): Session[] => {
    const chFilter = (channels != null && channelsOp != null)
      ? {
          names: channels,
          operator: channelsOp
        }
      : null
    const anFilter = (annotations != null && annotationsOp != null)
      ? {
          names: annotations,
          operator: annotationsOp
        }
      : null

    const pagination: PaginationOptions = {
      from_idx: page * rowsPerPage,
      to_idx: (page + 1) * rowsPerPage
    }
    return props.listSessions({
      from_bt: fromBt,
      to_bt: toBt,
      from_tt: fromTt,
      to_tt: toTt,
      annotations: anFilter,
      device_ids: null,
      channels: chFilter,
      sr
    },
    { field: orderBy as SessionSortOptions['field'], mode: order },
    pagination
    )
  }

  const filterOptions: FilterOption[] = [
    {
      label: 'Start Date',
      options: 'date',
      fromValue: fromBt,
      toValue: toBt,
      onChangeFrom: setFromBt,
      onChangeTo: setToBt
    },
    {
      label: 'End Date',
      options: 'date',
      fromValue: fromTt,
      toValue: toTt,
      onChangeFrom: setFromTt,
      onChangeTo: setToTt
    },
    {
      label: 'Sample Rate',
      options: [44100, 48000],
      value: sr,
      onChange: setSr
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
  const submitFilters = (): void => {
    setData(getSessions())
  }
  const clearFilters = (): void => {
    [setFromBt, setToBt, setFromTt, setToTt, setSr, setChannels, setChannelsOp, setAnnotations, setAnnotationsOp].forEach((setter) => {
      setter(null)
    })
  }

  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage)
  }
  const onRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const newVal = event.target.value
    setRowsPerPage(parseInt(newVal, 10))
    setPage(0)
  }

  const onOrderChange = (orderBy: string): void => {
    setOrderBy(orderBy)
    setOrder(order === 'asc' ? 'desc' : 'asc')
    setPage(0)
  }

  useEffect(submitFilters, [page, order, orderBy, rowsPerPage])
  useEffect(() => {
    setPage(0)
  }, [fromBt, toBt, fromTt, toTt, sr, channels, channelsOp, annotations, annotationsOp, rowsPerPage])

  return (
    <ThemeProvider theme={otosenseTheme2022}>
      <SessionTable
        data={data}
        columns={columns}
        key={'ID'}
        clearFilters={clearFilters}
        submitFilters={submitFilters}
        filterOptions={filterOptions}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        onPageChange={onPageChange}
        orderBy={orderBy}
        order={order}
        onOrderChange={onOrderChange}
      />
    </ThemeProvider>
  )
}
