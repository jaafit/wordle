import './App.css';
import {useEffect, useState} from "react";

const replaceAt = function(subject, index, replacement) {
    return subject.substring(0, index) + replacement + subject.substring(index + replacement.length);
}

function App() {
    const [word, setWord] = useState('');
    const [guess, setGuess] = useState('');
    const [hint, setHint] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setHint('');
        if (word.length === guess.length) {
            let unconsumed = `${word}`;

            let newHint = ' '.repeat(word.length);
            // first pass to get the correct letters
            for (let i = 0; i < word.length; i++)
                if (guess[i] === word[i]) {
                    newHint = replaceAt(newHint, i, guess[i]);
                    unconsumed = replaceAt(unconsumed, i, ' ');
                }

            console.log({unconsumed});

            // now mark unconsumed as matches
            for (let i = 0; i < word.length; i++) {
                if (newHint[i] !== ' ')
                    continue;
                const index = unconsumed.indexOf(guess[i]);
                if (~index ) {
                    newHint = replaceAt(newHint, i, '+');
                    unconsumed = replaceAt(unconsumed, index, ' ');
                }
                else
                    newHint = replaceAt(newHint, i, '#');
            }
            setHint(newHint);
        }

    }, [word, guess, setHint]);

    const copy = () => {
        navigator.clipboard.writeText(hint);
        setCopied(true);
    }

  return (
    <div className="text-center bg-emerald-800">
      <header className=" p-10">
        <p className="text-2xl">
          Wordle
        </p>
      </header>

        <div className="flex flex-col align-center space-y-2">
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


    </div>
  );
}

export default App;
