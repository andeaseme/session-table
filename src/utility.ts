import * as moment from 'moment'

export interface Session {
  ID: string
  device_id: string
  bt: number
  tt: number
  sr: number
  bit_depth: number
  channels: Array<{
    name: string
    description: string
  }>
  annotations: Array<{
    name: string
    bt: number
    tt: number
  }>
}

export type Operator = 'and' | 'or'

export type Optional<T> = T | null | undefined

/**
 * Timestamp is expected to be in milliseconds
 *
 * @param timestamp milliseconds
 * @param showDateTimeInUTC
 */
export const formatTimestamp = (timestamp: number, showDateTimeInUTC = false): string => {
  if (showDateTimeInUTC) {
    return (!isNaN(timestamp))
      ? moment.utc(new Date(timestamp)).format('YYYY-MM-DD, HH:mm:ss') + ' -UTC'
      : '-'
  }
  return (!isNaN(timestamp)) ? moment.unix(timestamp / 1000).format('YYYY-MM-DD, HH:mm:ss') : '-'
}

/**
 * Session time is expected to be in microseconds
 *
 * @param bt microseconds
 * @param showDateTimeInUTC
 */
export const formatSessionTime = (bt: number, showDateTimeInUTC = false): string => {
  return formatTimestamp(bt / 1000, showDateTimeInUTC)
}
