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

    const [possibleLetters, possibleLettersHint] = useMemo(() => {
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
                if (sameLength.length) {
                    setWord(sameLength[0].toUpperCase());
                    addGuess(sameLength[0], guess);
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

    return <div className="flex flex-col items-center space-y-2">
        <div className="p-5 flex flex-col h-full items-center space-y-4 overflow-auto" style={{maxHeight:'600px'}}>
        {guesses.map((g,i) =>
            <Word key={i}
                  word={g.word}
                  hint={g.hint}
                  possibilities={won && g.word !== word && possibilities[i]}/>
        )}
        </div>

        <input placeholder="Enter your guess"
               className="w-1/2 p-2"
               value={guess}
               onChange={onChangeGuess}
               onKeyDown={onKeyDown}/>

        {won && <button onClick={reset} >Reset</button>}
        {!won && <div className="px-3"><Word word={possibleLetters} hint={possibleLettersHint}/></div>}


    </div>

}

export default OnePlayer;