
const replaceAt = function(subject, index, replacement) {
    return subject.substring(0, index) + replacement + subject.substring(index + replacement.length);
}

export const getHint = (word, guess) =>  {
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
        if (~index ) {
            hint = replaceAt(hint, i, '+');
            unconsumed = replaceAt(unconsumed, index, ' ');
        }
        else
            hint = replaceAt(hint, i, '#');
    }
    return hint;
}

export const getPossibleWords = (hints)  => {
    return [1,2,3];
}

