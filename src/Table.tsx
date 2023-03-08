import React from 'react'

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material'

import { SessionsTableContainer } from './tableStyles'
import { type Column, Row } from './Row'
import { type FilterOption, SessionFilter } from './Filter'

// import SearchUploadBtn from "../_reference_code_table/components/SearchUploadBtn";

const renderHeaders = (columns: Column[]): JSX.Element => {
  return (
    <>
      {columns.map((c, i) => {
        return <TableCell key={`header-${i}`} sx={{ background: '#fff' }} >{c.label}</TableCell>
      })}
    </>
  )
}

interface TableProps {
  data: any[]
  columns: Column[]
  clearFilters: VoidFunction
  submitFilters: VoidFunction
  filterOptions: FilterOption[]
}

export const SessionTable = (props: TableProps): JSX.Element => {
  return (
    <Box>
      <SessionFilter clearFilters={props.clearFilters} submitFilters={props.submitFilters} filterOptions={props.filterOptions}/>
      <SessionsTableContainer sx={{ borderTop: '1px solid #eee', width: '100%' }}>
        <Table size="small" sx={{ marginBottom: 1 }} stickyHeader>
          <TableHead sx={{ borderBottom: '1px solid #eee' }}>
            <TableRow>
              <TableCell sx={{ background: '#fff' }} colSpan={1} />
              {renderHeaders(props.columns)}
              <TableCell sx={{ background: '#fff' }} colSpan={1} />
            </TableRow>
          </TableHead>
          <TableBody sx={{ marginBottom: 64 }}>
            {props.data?.length > 0
              ? <>{props.data.map((v, i) => (
                <Row
                  key={`${i}`}
                  data={v}
                  columns={props.columns}
                  isExpanded={false}
                  onClickExpand={() => null}
                  onSelectSession={() => { console.log(v) }}
                />
              ))}</>
              : <TableRow>
                <TableCell colSpan={9} sx={{ textAlign: 'center' }}>{'No Data'}</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </SessionsTableContainer>
    </Box>
  )
}
