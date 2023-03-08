import { type CSSProperties } from 'react'
import { styled } from '@mui/material/styles'
import { TableContainer } from '@mui/material'

export const cellMW160: CSSProperties = {
  maxWidth: 160,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
}
export const cellComment: CSSProperties = {
  maxWidth: 200,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  paddingLeft: 0
}

export const cellIconSpacing: CSSProperties = {
  paddingLeft: 0.3,
  paddingRight: 0.3,
  maxWidth: 24
}
export const cellDateTime: CSSProperties = {
  maxWidth: 192,
  minWidth: 192,
  overflow: 'hidden',
  background: 'transparent'
}

export const SessionsTableContainer = styled(TableContainer)({
  height: 'calc(100vh - 286px)',
  overflow: 'auto',
  ml: -1,
  mr: -1,
  borderTop: '1px solid #eee',
  width: '100%'
})

export const firstLetterStyle = {
  textTransform: 'none',
  '::first-letter': {
    textTransform: 'uppercase'
  }
}

// export const cellDateTimeL: CSSProperties = {
//   maxWidth: 206,
//   minWidth: 206,
//   overflow: 'hidden',
//   background: 'transparent'
// };
// export const cellSensorL: CSSProperties = {
//   minWidth: 80,
//   maxWidth: 110,
//   overflow: 'hidden',
// };
// export const cellScore: CSSProperties = {
//   maxWidth: 43
// };
//
// export const centerTableFooter: CSSProperties = {
//   display: 'flex',
//   justifyContent: 'center',
//   width: 'calc(100% - 96px)',
//   position: 'fixed',
//   bottom: 0,
//   borderTop: '1px solid lightgray',
//   background: 'white',
// };
//
// export const StyledCollapse = styled(Collapse)({
//   backgroundColor: 'rgba(0,161,192, 0.05)'
// });
//
// export const TableCellNoPl = styled(TableCell)({
//   paddingLeft: 0
// });
//
// export const SearchFooter = styled(Box)({
//   position: 'absolute',
//   bottom: 0,
//   textAlign: 'right',
//   width: '100%',
//   height: '86px',
//   padding: '1rem',
//   backgroundColor: '#a3a6b4',
// });
//
// export const SearchHeader = styled(Box)({
//   display: 'flex',
//   justifyContent: 'space-between',
//   background: '#f3f3f3',
//   padding: '18px',
// });
//
// export const ReviewSessionContainer = styled('main')({
//   width: '100%',
//   height: '100%',
// });
//
// export const PaginationIconContainer = styled('span')({
//   verticalAlign: 'middle',
//   cursor: 'pointer',
// });
//
// export const PlaybackContainer = styled(Box)({
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   marginBottom: 0.5,
//   borderRadius: 4,
//   height: 30,
// });
//
// export const PlaybackRow = styled(Box)({
//   display: 'flex',
//   flexFlow: 'row nowrap',
//   alignItems: 'center',
// });
