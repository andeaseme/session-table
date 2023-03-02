import {IconButton, TableCell, TableRow } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import {formatSessionTime, Session} from "./utility";
import {cellComment, cellDateTime, cellIconSpacing, cellMW160} from "./tableStyles";
import { CenterBox } from '@otosense/components';



interface RowProps {
  isExpanded: boolean;
  onClickExpand: VoidFunction;
  onSelectSession: VoidFunction;
  session: Session;

}

const data = {
  asset_variant: 'asset_variant',
  quality_score: 9.75,
  ai_msgs: [{message: 'ai_msg'}],
  feedback: 1,
  notes: 'notes',

}

export const Row = (props: RowProps) => {
  return (
              <TableRow sx={{width: '100%', borderBottom: '0.5px solid #ccc'}} hover>
                <TableCell sx={cellIconSpacing}>
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={props.onClickExpand}
                  >
                    {props.isExpanded ? <KeyboardArrowUpIcon color="primary"/> : <KeyboardArrowDownIcon color="primary" />}
                  </IconButton>
                </TableCell>
                <TableCell sx={cellDateTime}>{formatSessionTime(+props.session.bt)}</TableCell>
                <TableCell sx={cellMW160}>{data.asset_variant}</TableCell>
                <TableCell sx={cellMW160}>
                  {data.quality_score >= 5 ?  'Pass' : 'Fail'}
                </TableCell>
                <TableCell sx={cellDateTime}>
                  {!!data.ai_msgs?.length && data.ai_msgs[0].message}
                </TableCell>
                <TableCell sx={{verticalAlign: 'bottom', maxWidth: 20, paddingRight: 0}}>
                  {data.feedback === 1 && (
                    <ThumbUpIcon color="success" key="pass-icon" />
                  )}
                  {data.feedback === 2 && (
                    <ThumbDownIcon color="error" key="fail-icon"/>
                  )}
                </TableCell>
                <TableCell sx={cellComment}>{data.notes}</TableCell>

                <TableCell sx={cellIconSpacing}>
                  <CenterBox>
                    <OpenInNewIcon color="primary" onClick={props.onSelectSession}/>
                  </CenterBox>
                </TableCell>
              </TableRow>

  );
}
