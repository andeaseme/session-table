import React from 'react';
import './App.css';
import {Row} from "./Row";
import {test_session} from "./testData";

function App() {
  return (
    <div className="App">
      <Row
        session={test_session}
        isExpanded={false}
        onClickExpand={() => null}
        onSelectSession={() => null}
      />
    </div>
  );
}

export default App;
