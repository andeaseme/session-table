import * as moment from 'moment';


export interface Session {
  ID: string;
  bt: number;
  tt: number;
  sr: number;
  bit_depth: number;
  channels: { name: string; }[];
  blocks: {
    bt: number;
    tt: number;
    local_path: string;
    uploaded: boolean;
    annotations: {
      name: string;
      bt: number;
      tt: number;
    }[];
  }[];
}

/**
 * Timestamp is expected to be in milliseconds
 *
 * @param timestamp milliseconds
 * @param showDateTimeInUTC
 */
export const formatTimestamp = (timestamp: number, showDateTimeInUTC=false): string => {
  if (showDateTimeInUTC === true) {
    return (!!timestamp) ? moment.utc(new Date(timestamp)).format('YYYY-MM-DD, HH:mm:ss') + ' -UTC'
      : '-';
  }
  return (!!timestamp) ? moment.unix(timestamp / 1000).format('YYYY-MM-DD, HH:mm:ss') : '-';
}

/**
 * Session time is expected to be in microseconds
 *
 * @param bt microseconds
 * @param showDateTimeInUTC
 */
export const formatSessionTime = (bt: number, showDateTimeInUTC=false): string => {
  return formatTimestamp(bt / 1000, showDateTimeInUTC);
}
