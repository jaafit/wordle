import useLocalStorageState from "use-local-storage-state";
import {useCallback, useState} from "react";
import words from './mywords.json';
import _ from 'lodash';
import Word from "./Word";
import {getHint, getPossibleWords} from "./wordle-util";

const OnePlayer = () => {
    const [word, setWord] = useLocalStorageState('wordle-word-1p', {defaultValue:''});
    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState('');
    const [won, setWon] = useState(false);

    console.log({guesses});

    const onChangeGuess = useCallback(e => {
        setGuess(e.target.value);
    },[setGuess] );


    const onKeyDown = useCallback((e) => {

        const addGuess = (word, guess) => setGuesses(gs => [...gs, {
            guess,
            hint: getHint(word, guess),
            possibilities: getPossibleWords(gs.map(({hint}) => hint)).length,
        }]);

        if (e.key === 'Enter') {
            if (guesses.length && guess.length !== word.length)
                return;

            if (guesses.length === 0) {
                // find a new word
                const sameLength = _.shuffle(words.words.filter(w =>  w.length === guess.length));
                console.log({sameLength});
                if (sameLength.length) {
                    setWord(sameLength[0]);
                    addGuess(sameLength[0], guess);
                    console.log(sameLength[0]);
                }
            }
            else
                addGuess(word, guess);

            if (guess === word)
                setWon(true);

            setGuess('');
        }
    }, [guesses, guess, word, setWord, setGuesses]);

    const reset = () => {
        setWon(false);
        setWord('');
        setGuesses([]);
    }

    const possibleWords = getPossibleWords(guesses.map(({hint}) => hint));

    return <div className="flex flex-col flex-wrap h-full items-center space-y-4">
        {guesses.map((g,i) =>
            <Word key={i}
                  word={g.guess}
                  hint={g.hint}
                  possibilities={won && g.possibilities}/>
        )}

        <input placeholder="Enter your guess"
               className="w-1/2 p-2"
               value={guess}
               onChange={onChangeGuess}
               onKeyDown={onKeyDown}/>

        {won && <button onClick={reset} >Reset</button>}


    </div>

}

export default OnePlayer;