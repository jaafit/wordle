import useLocalStorageState from "use-local-storage-state";
import {useCallback, useMemo, useState} from "react";
import words from './mywords.json';
import _ from 'lodash';
import Word from "./Word";
import {getHint, getPossibleLetters, getPossibleWords} from "./wordle-util";

const OnePlayer = () => {
    const [word, setWord] = useLocalStorageState('wordle-word-1p', {defaultValue:''});
    const [guesses, setGuesses] = useState([]);
    const [guess, setGuess] = useState('');
    const [won, setWon] = useState(false);

    const onChangeGuess = useCallback(e => {
        setGuess(e.target.value.toUpperCase());
    },[setGuess] );

    const possibilities = useMemo(() => {
        return getPossibleWords(guesses);
    }, [guesses]);
    console.log(possibilities.map(p => p.length), 'possibilities');

    const possibleLetters = useMemo(() => {
        return getPossibleLetters(guesses);
    }, [guesses]);

    const onKeyDown = useCallback((e) => {

        const addGuess = (word, guess) => setGuesses(gs => [...gs, {
            word: guess,
            hint: getHint(word, guess),
        }]);

        if (e.key === 'Enter') {
            if (guesses.length && guess.length !== word.length)
                return;

            if (guesses.length === 0) {
                // find a new word
                const sameLength = _.shuffle(words.words.filter(w =>  w.length === guess.length));
                console.log({sameLength});
                if (sameLength.length) {
                    setWord(sameLength[0].toUpperCase());
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

    return <div className="flex flex-col h-full items-center space-y-4" style={{maxHeight:'400px'}}>
        {guesses.map((g,i) =>
            <Word key={i}
                  word={g.word}
                  hint={g.hint}
                  possibilities={won && possibilities[i]}/>
        )}

        <input placeholder="Enter your guess"
               className="w-1/2 p-2"
               value={guess}
               onChange={onChangeGuess}
               onKeyDown={onKeyDown}/>

        {won && <button onClick={reset} >Reset</button>}
        {!won && <Word word={possibleLetters}/>}


    </div>

}

export default OnePlayer;