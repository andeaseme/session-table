import React from 'react'

import './App.css'
import { mockListSessions } from './testData'
import { OtoTable } from './OtoTable'

const App = (): JSX.Element => <OtoTable listSessions={mockListSessions}/>

export default App
