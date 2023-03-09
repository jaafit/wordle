import {useEffect, useState} from "react";
import useLocalStorageState from "use-local-storage-state";
import {getHint} from "./wordle-util";



const TwoPlayer = () => {
    const [word, setWord] = useLocalStorageState('wordle-word-2p', {defaultValue:''});
    const [guess, setGuess] = useState('');
    const [hint, setHint] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setHint('');
        if (word.length === guess.length) {

            setHint(getHint(word, guess));
        }

    }, [word, guess, setHint]);

    const copy = () => {
        navigator.clipboard.writeText(hint);
        setCopied(true);
    }

    return <div className="flex flex-col align-center space-y-2">
        <input value={word} placeholder="Enter your word"
               className="text-xl text-black p-3 m-8 bg-emerald-200"
               onChange={e => {setWord(e.target.value.toUpperCase()); setCopied(false); }}/>
        <input value={guess}
               placeholder="Enter their guess"
               className="text-xl text-black p-3 m-8 bg-emerald-200"
               onChange={e => {setGuess(e.target.value.toUpperCase()); setCopied(false); }}/>
        {hint && <div className="flex flex-row space-x-3">
            <p className="text-2xl p-3 border m-8 bg-emerald-200">{hint}</p>
            <button className="text-white" onClick={copy}>{copied ? 'copied' : 'copy'}</button>
        </div>}
    </div>

}

export default TwoPlayer;