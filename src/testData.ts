export interface Session {
  ID: string;
  device_id: string;
  bt: number;
  tt: number;
  sr: number;
  bit_depth: number;
  channels: {
    name: string;
    description: string;
  }[];
  annotations: {
    name: string;
    bt: number;
    tt: number;
  }[];
}

type Operator = 'and' | 'or'

type Optional<T> = T | null

export interface SessionFilterOptions {
  device_ids: string[];
  from_bt: number;
  to_bt: number;
  from_tt: number;
  to_tt: number;
  annotations: {
    names: string;
    operator: Operator;
  };
  channels: {
    names: string;
    operator: Operator;
  };
  sr: number;
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
  const sessions = []
  const timeStep = 600000000
  for(let i = 0; i < n; i++) {
    const bt = 1677672000000000 + (i * timeStep)
    const tt = 1677672000000000 + ((i+1) * timeStep)
    sessions.push(
      {
        ID: `mockSession${i}`,
        device_id: `deviceId${i % 2 + 1}`,
        bt,
        tt,
        sr: 44100,
        bit_depth: 8,
        channels: [{
          name: 'channel-0',
          description: 'microphone',
        }],
        annotations: mockAnnotations(bt, tt, timeStep/ 10, `tag${i % 2 + 1}`),
      }
    );
  }
  return sessions
}

const mockSessions: Session[] = mockSessionGen(100)


const filterSessions = (f: SessionFilterOptions, sessions=mockSessions) => {
  // partially implemented for testing
  return sessions.filter((s) => {
    const {from_bt, to_bt, from_tt, to_tt} = f
    if (from_bt != null && s.bt < from_bt) {
      return false;
    }
    if (to_bt != null && s.bt > from_bt) {
      return false;
    }
    if (from_tt != null && s.tt < from_tt) {
      return false;
    }
    if (to_tt != null && s.tt > to_tt) {
      return false;
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
