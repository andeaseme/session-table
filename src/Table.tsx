import React from 'react';

import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import {ReviewSessionsTableContainer} from "./tableStyles";
import {Column, Row } from './Row';

// import SearchUploadBtn from "../_reference_code_table/components/SearchUploadBtn";


const renderHeaders = (columns: Column[]) => {
  return (
    <>
      {columns.map((c, i) => {
        return <TableCell key={`header-${i}`} sx={{background: '#fff'}} >{c.label}</TableCell>;
      })}
    </>
  );
};

interface TableProps {
  data: any[];
  columns: Column[]
}

export const SessionTable = (props: TableProps) => {
  return (
    <Box>
      {/*<SearchUploadBtn/>*/}
      <ReviewSessionsTableContainer sx={{ borderTop: '1px solid #eee', width: '100%'}}>
        <Table size="small" sx={{marginBottom: 1}} stickyHeader>
          <TableHead sx={{borderBottom: '1px solid #eee'}}>
            <TableRow>
              <TableCell sx={{background: '#fff'}} colSpan={1} />
              {renderHeaders(props.columns)}
              <TableCell sx={{background: '#fff'}} colSpan={1} />
            </TableRow>
          </TableHead>
          <TableBody sx={{marginBottom: 64}}>
            {!!props.data?.length ?
              <>{props.data.map((v, i) => (
                <Row
                  key={`${i}`}
                  data={v}
                  columns={props.columns}
                  isExpanded={false}
                  onClickExpand={() => null}
                  onSelectSession={() => null}
                />
              ))}</>
              :
              <TableRow>
                <TableCell colSpan={9} sx={{textAlign: 'center'}}>{'No Data'}</TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </ReviewSessionsTableContainer>
    </Box>
  );
}
