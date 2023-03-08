import { IconButton, TableCell, TableRow } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { CenterBox } from '@otosense/components'

import { cellIconSpacing } from './tableStyles'
import React from 'react'

export interface Column {
  key:(string | ((data: any) => any))
  label: string
  sx: any
}

export interface RowProps {
  isExpanded: boolean
  onClickExpand: VoidFunction
  onSelectSession: VoidFunction
  data: any
  columns: Column[]
  key: string
}

export const Row = (props: RowProps): JSX.Element => {
  return (
            <React.Fragment key={`row-${props.key}`}>
              <TableRow sx={{ width: '100%', borderBottom: '0.5px solid #ccc' }} hover>
                <TableCell sx={cellIconSpacing}>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={props.onClickExpand}
                  >
                    {props.isExpanded ? <KeyboardArrowUpIcon color="primary"/> : <KeyboardArrowDownIcon color="primary" />}
                  </IconButton>
                </TableCell>
                {props.columns.map((c, i) => (
                  <TableCell sx={c.sx} key={`row-${props.key}-col-${i}`}>
                    {(typeof c.key === 'string') ? props.data[c.key] : c.key(props.data)}
                  </TableCell>
                )
                )}
                <TableCell sx={cellIconSpacing}>
                  <CenterBox>
                    <OpenInNewIcon color="primary" onClick={props.onSelectSession}/>
                  </CenterBox>
                </TableCell>
              </TableRow>
            </React.Fragment >

  )
}
