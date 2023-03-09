const Letter = ({letter, hint}) => {
    const bg = hint === '+' ? 'bg-amber-600' : hint === '#' ? 'bg-transparent' : 'bg-emerald-300';
    return <div className="">
        <p className={"w-10 h-10 table-cell align-middle text-center text-2xl text-bold rounded "+bg}>
            {letter.toUpperCase()}
        </p>
    </div>;

}

export default Letter;