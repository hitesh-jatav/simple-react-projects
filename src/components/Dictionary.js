import React, { useState } from 'react';

const Dictionary = () => {
    const [word, setWord] = useState('');
    const [meaning, setMeaning] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const getMeaning = async () => {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/`;
        if (!word.trim()) return;

        setIsFetching(true);
        try {
            const response = await fetch(url + word);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMeaning(data[0]);
        } catch (error) {
            console.error('Fetch error:', error);
            setMeaning(null);
        } finally {
            setIsFetching(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            getMeaning();
        }
    };

    return (
        <div className='dict-page'>
            <h2 className='bold my-3'>
                Dictionary</h2>

            <div className="search">
                <input
                    type="text"
                    value={word}
                    onChange={(e) => {
                        setWord(e.target.value);
                        if (!e.target.value.trim()) setMeaning(null);
                    }}
                    onKeyDown={handleKeyDown}
                    disabled={isFetching}
                    placeholder='Search a word!'
                />
                <div className="button-src">
                    <button onClick={getMeaning} disabled={isFetching}>
                        <i className="ri-search-2-line"></i>
                    </button>
                </div>
            </div>

            {isFetching && <div className='meaning color-gray border-0'>Loading... please wait</div>}
            {!isFetching && !meaning && <div className='meaning color-gray border-0'>Click on search icon or enter a valid word!</div>}

            {meaning && !isFetching && (
                <div className='meaning color-black p-5'>
                    <p>
                        <span className='color-gray'>Phonetics: </span>
                        <span className='fw-bold'>{meaning.phonetic}</span>
                    </p>
                    {meaning.meanings.map((mean, index) => (
                        <div className='definitions-container' key={index}>
                            <p className='header fw-bold'>{mean.partOfSpeech}</p>
                            <ul>
                                {mean.definitions.map((def, ind) => (
                                    <li key={'def' + ind}>{def.definition}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dictionary;
