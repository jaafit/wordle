import './App.css';
import {useState} from "react";
import classnames from "classnames";
import OnePlayer from "./OnePlayer";
import TwoPlayer from "./TwoPlayer";


function App() {
    const [mode, setMode] = useState('2p');

  return (
    <div className="text-center bg-emerald-800 w-screen h-screen">
      <header className=" p-10">

          <div className="flex flex-row justify-around">
              <p className="text-2xl">Wordle</p>
              {['1p', '2p'].map(m =>
                  <button className={classnames("text-lg p-3", {'bg-emerald-200':mode===m})}
                          onClick={()=>setMode(m)}
                          disabled={mode===m}>
                      {m}
                  </button>)}
        </div>
      </header>

        {mode === '1p' &&
            <OnePlayer/>}

        {mode === '2p' &&
            <TwoPlayer/>
        }


    </div>
  );
}

export default App;
