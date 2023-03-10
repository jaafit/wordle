import words from './mywords.json';

const replaceAt = function (subject, index, replacement) {
  return subject.substring(0, index) + replacement + subject.substring(index + replacement.length);
}

export const getHint = (word, guess) => {
  let unconsumed = `${word}`;

  let hint = ' '.repeat(word.length);
  // first pass to get the correct letters
  for (let i = 0; i < word.length; i++)
    if (guess[i] === word[i]) {
      hint = replaceAt(hint, i, guess[i]);
      unconsumed = replaceAt(unconsumed, i, ' ');
    }

  //console.log({unconsumed});

  // now mark unconsumed as matches
  for (let i = 0; i < word.length; i++) {
    if (hint[i] !== ' ')
      continue;
    const index = unconsumed.indexOf(guess[i]);
    if (~index) {
      hint = replaceAt(hint, i, '+');
      unconsumed = replaceAt(unconsumed, index, ' ');
    } else
      hint = replaceAt(hint, i, '#');
  }
  return hint;
}

export const getPossibleWords = (guesses) => {
  // how many words fit all the hints?
  let possibleWords;
  return guesses.map(guess => {
      possibleWords = (possibleWords || words.words)
          .filter(word => {
                if (guess.word.length !== word.length) return false;
                const debug = false;
                debug && console.log('considering', word, guess.hint);
                let unconsumed = word.slice();
                for (let i = 0; i < word.length; i++) {
                  if (guess.hint[i] !== '#' && guess.hint[i] !== '+') {
                    if (word[i] !== guess.hint[i]) { debug && console.log('no letter here'); return false;}
                    else { unconsumed = replaceAt(unconsumed, i, ' ');
                    debug && console.log({unconsumed});
                    }
                  }

                }


                for (let i = 0; i < word.length; i++) {
                  if (guess.hint[i] === '+') {
                    const index = unconsumed.indexOf(guess.word[i]);
                    if (!~index) {debug && console.log('no such letter'); return false;}
                    if (guess.word[i] === word[i]) { debug && console.log('letter is here'); return false; }
                    else { unconsumed = replaceAt(unconsumed, index, ' ');
                      debug && console.log({unconsumed});
                    }
                  } else if (guess.hint[i] === '#') {
                    if (~unconsumed.indexOf(guess.word[i])) {debug && console.log('word has letter'); return false;}
                  }
                }
                debug && console.log(word, 'works');
                return true;
              }
          )
      return possibleWords;
    }
  );
}
//
// const tests = [
//   {word: 'BLOCS', guesses: ['RESET', 'BENTS', 'BLESS', 'BLOTS', 'BLOCK']},
//   {word: 'LATED', guesses: ['BLOCS', 'CRIME']},
//     ];
// tests.map(t =>
//    getPossibleWords(t.guesses.map(g => ({word: g, hint: getHint(t.word, g)})))
// )

export const getPossibleLetters = (guesses) => {
  let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let safe = [];
  let exhausted = [];
  guesses.forEach(guess => {
    const splitGuess = guess.word.split('');
    splitGuess.forEach((gl, i) =>
      (guess.hint[i] === gl || guess.hint[i] === '+') && safe.push(gl)
    );
    splitGuess.forEach((gl, i) => {
        if (guess.hint[i] === '#') {
          if (!~safe.indexOf(gl) && ~letters.indexOf(gl))
            letters.splice(letters.indexOf(gl),1)
          else if (~safe.indexOf(gl))
            exhausted.push(gl)
        }
    });
  });
  const hint = letters.map(l => ~exhausted.indexOf(l) ? '#' : l);
  return [letters.join(''), hint.join('')];

}

