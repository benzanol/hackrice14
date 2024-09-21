import * as React from 'react';
import { useState } from 'react';
import * as M from "@mui/material";
import './App.css';
import SetupPage from './misc/SetupPage';
import SummaryView from './summary/SummaryView';
import AddSource, { RecurringSource } from './misc/AddSource';

export const GlobalContext = React.createContext(null);
type GlobalState = {};

function App() {
  const [callback, setCallback] = useState<null | ((r: RecurringSource) => void)>(null);
  console.log("ooh", callback)

  const cb = (v) => {
    console.log("CALLEDBACK", v, callback)
    if (v) setCallback(null)
    console.log("k", v, callback)
  };

  return (
    <GlobalContext.Provider value={{}}>
      <div className="bg-red-500 w-[800px] p-20 text-left">

        <AddSource callback={callback} />
        <M.Button onClick={() => {
                    console.log('ok clicked');
                    setCallback(() => cb)
                    console.log('cb added');
                  }}>
          ah
        </M.Button>

        <SetupPage />
        <M.Button variant="contained">Hello world</M.Button>
        <M.Typography variant="subtitle1" component="div">
          Selected: hi
        </M.Typography>
        <br />
        <SummaryView />
      </div>

    </GlobalContext.Provider>
  )
}

export default App
