import React from 'react'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material'
import { visuallyHidden } from '@mui/utils'

import { SessionsTableContainer } from './tableStyles'
import { Row } from './Row'
import { type FilterOption, SessionFilter } from './Filter'
import { TablePaginationRowsPerPage } from './Pagination'

export interface Column {
  // eslint-disable-next-line @typescript-eslint/key-spacing
  key: (string | ((data: any) => any))
  label: string
  sx: any
  orderBy?: string
}

const renderHeaders = (columns: Column[], orderBy: string, order: 'asc' | 'desc', onOrderChange: (orderBy: string) => void): JSX.Element => {
  return (
    <>
      {columns.map((c, i) => {
        if (c.orderBy != null) {
          return (
            <TableCell
              key={`header-${i}`}
              sx={{ background: '#fff' }}
              sortDirection={orderBy === c.orderBy ? order : false}
            >
              <TableSortLabel
                active={orderBy === c.orderBy}
                direction={orderBy === c.orderBy ? order : 'asc'}
                onClick={() => {
                  onOrderChange(c.orderBy as string)
                }}
              >
                {c.label}
                {orderBy === c.orderBy
                  ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                    )
                  : null}
              </TableSortLabel>
            </TableCell>
          )
        }

        return <TableCell key={`header-${i}`} sx={{ background: '#fff' }}>{c.label}</TableCell>
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
  rowsPerPage: number
  onRowsPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  page: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void
  orderBy: string
  order: 'asc' | 'desc'
  onOrderChange: (orderBy: string) => void
}

export const SessionTable = (props: TableProps): JSX.Element => {
  return (
    <Box>
      <SessionFilter clearFilters={props.clearFilters} submitFilters={props.submitFilters}
                     filterOptions={props.filterOptions}/>
      <SessionsTableContainer sx={{ borderTop: '1px solid #eee', width: '100%' }}>
        <Table size="small" sx={{ marginBottom: 1 }} stickyHeader>
          <TableHead sx={{ borderBottom: '1px solid #eee' }}>
            <TableRow>
              <TableCell sx={{ background: '#fff' }} colSpan={1}/>
              {renderHeaders(props.columns, props.orderBy, props.order, props.onOrderChange)}
              <TableCell sx={{ background: '#fff' }} colSpan={1}/>
            </TableRow>
          </TableHead>
          <TableBody sx={{ marginBottom: 64 }}>
            {props.data?.length > 0
              ? <>{props.data.map((v, i) => (
                <Row
                  key={`row-${i}`}
                  id={`row-${i}`}
                  data={v}
                  columns={props.columns}
                  isExpanded={false}
                  onClickExpand={() => null}
                  onSelectSession={() => {
                    console.log(v)
                  }}
                />
              ))}</>
              : <TableRow>
                <TableCell colSpan={9} sx={{ textAlign: 'center' }}>{'No Data'}</TableCell>
              </TableRow>
            }
          </TableBody>
          <TablePaginationRowsPerPage
            rowsPerPage={props.rowsPerPage}
            onRowsPerPageChange={props.onRowsPerPageChange}
            page={props.page}
            onPageChange={props.onPageChange}
          />
        </Table>
      </SessionsTableContainer>
    </Box>
  )
}
