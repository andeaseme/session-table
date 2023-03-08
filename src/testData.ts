import {Operator, Optional, Session} from "./utility";

export interface SessionFilterOptions {
  device_ids: Optional<string[]>;
  from_bt: Optional<number>;
  to_bt: Optional<number>;
  from_tt: Optional<number>;
  to_tt: Optional<number>;
  annotations?: Optional<{
    names: string;
    operator: Operator;
  }>;
  channels: Optional<{
    names: string[];
    operator: Operator;
  }>;
  sr: Optional<number>;
}

export interface SessionSortOptions {
  field: 'device_id' | 'bt' | 'tt' | 'sr';
  mode: 'asc' | 'desc'
}

export interface PaginationOptions {
  from_idx: number;
  to_idx: number;
}

const mockAnnotations = (start: number, stop: number, step: number, tag: string) => {
  const annotations = []
  for (let i=start; i < stop+step; i+=step) {
    annotations.push({
      name: tag,
      bt: i,
      tt: i + step,
    })
  }
  return annotations;
}

const mockSessionGen = (n=10): Session[] => {
  const sessions = [];
  const timeStep = 600000000;
  const sampleRates = [44100, 48000] ;
  for(let i = 0; i < n; i++) {
    const bt = 1677672000000000 + (i * timeStep)
    const tt = 1677672000000000 + ((i+1) * timeStep)
    const channels = [];
    for(let j = 0; j < i%4 + 1; j++) {
      channels.push(
        {
          name: `ch${j}sr${sampleRates[i%2]}`,
          description: 'microphone',
        }
      )
    }
    sessions.push(
      {
        ID: `mockSession${i}`,
        device_id: `deviceId${i % 2 + 1}`,
        bt,
        tt,
        sr: sampleRates[i%2],
        bit_depth: 8,
        channels: channels,
        annotations: mockAnnotations(bt, tt, timeStep/ 10, `tag${i % 2 + 1}`),
      }
    );
  }
  return sessions
}

const mockSessions: Session[] = mockSessionGen(100)


const filterSessions = (f: SessionFilterOptions, sessions=mockSessions) => {
  // partially implemented for testing
  const _sessions = [...sessions];
  return _sessions.filter((s) => {
    const {from_bt, to_bt, from_tt, to_tt, sr, channels} = f;
    if (from_bt != null && s.bt < from_bt) {
      return false;
    }
    if (to_bt != null && s.bt > to_bt) {
      return false;
    }
    if (from_tt != null && s.tt < from_tt) {
      return false;
    }
    if (to_tt != null && s.tt > to_tt) {
      return false;
    }
    if (sr != null && s.sr !== sr) {
      return false;
    }
    if (channels != null) {
      const {names, operator} = channels;
      if (operator === 'and' && !names.every((includeName) => s.channels.some(({name}) => name === includeName))) {
        return false;
      } else if (operator === 'or' && !s.channels.some(({name}) => names.includes(name))) {
        return false;
      }

    }
    return true;
  })
}

const sortSessions = (sort: SessionSortOptions, sessions: Session[]) => {
  if (sessions?.length > 0) {
    if (sort.field === 'device_id') {
      if (sort.mode === 'asc') {
        sessions.sort((a, b) => a.device_id.localeCompare(b.device_id));

      } else {
        sessions.sort((b, a) => a.device_id.localeCompare(b.device_id));
      }
    } else {
      if (sort.mode === 'asc') {
        sessions.sort((a, b) => {
          const x = a[sort.field] as number;
          const y = b[sort.field] as number;
          return x - y;
        });
      } else {
        sessions.sort((b, a) => {
          const x = a[sort.field] as number;
          const y = b[sort.field] as number;
          return x - y;
        });
      }
    }
  }
  return sessions
}

export const mockListSessions = (
  filter:Optional<SessionFilterOptions>=null,
  sort: Optional<SessionSortOptions>=null,
  pagination: Optional<PaginationOptions>=null
): Session[] => {
  let s = (filter != null) ? filterSessions(filter, mockSessions) : [...mockSessions];
  if (sort != null) {
    s = sortSessions(sort, s);
  }
  if (pagination != null) {
    s = s.slice(pagination.from_idx, pagination.to_idx);
  }
  return s
}
