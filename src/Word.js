import Letter from "./Letter";
import {useState} from "react";

const Word = ({word, hint, possibilities}) => {
    const [showPossibilities,  setShowPossibilities] = useState(false);

    const letters = word.split('');
    return <div>

        <div className="flex flex-row space-x-3">
            {letters.map((l,i) => <Letter letter={l} hint={hint?.[i]} key={i}/>)}
            {possibilities &&
                <p onClick={()=>setShowPossibilities(!showPossibilities)}>{possibilities.length} possibilities</p>}
        </div>

        {showPossibilities && <div className="max-h-72 overflow-auto">
            {possibilities.map(p => <p key={p}>{p}</p>)}
        </div>}
    </div>
}

export default Word;
