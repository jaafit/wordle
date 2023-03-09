import Letter from "./Letter";

const Word = ({word, hint, possibilities}) => {

    const letters = word.split('');
    return <div className="flex flex-row space-x-3">
        {letters.map((l,i) => <Letter letter={l} hint={hint[i]} key={i}/>)}
        {possibilities && <p>{possibilities} possibilities</p>}
    </div>
}

export default Word;
