import React, { useEffect, useState } from 'react'

import './App.css'
import { mockListSessions } from './testData'
import { OtoTable } from '@otosense/ogui'
import { type Session } from '@otosense/ogui/lib/SessionTable/types'

const App = (): JSX.Element => {
  const [data, setData] = useState<Session[]>([])
  useEffect(() => {
    setData(mockListSessions())
  }, [])

  return (
    <>
      <OtoTable
        data={data}
        setComponentValue={(v) => {
          setData(mockListSessions(v.filter, v.sort, v.pagination))
        }}
      />
    </>
  )
}

export default App
