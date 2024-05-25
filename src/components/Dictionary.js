import React, { useState } from 'react'

const Dictionary = () => {
    const [word, setWord] = useState('');
    const [meaining, setMeaning] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const getMeaning = async () => {
        let url = `https://api.dictionaryapi.dev/api/v2/entries/en/`
        try {
            if (!word.trim()) return false;
            setIsFetching(true)
            const response = await fetch(url + word);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data[0]);
            setMeaning(data[0])
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setIsFetching(false)
        }
    }
    return (
        <div className='dict-page'>
            <div className='dict-wrapper'>
                <h2>Dictionary App</h2>

                <div className='input-box'>
                    <input disabled={isFetching}
                        placeholder='Search a word!' value={word}
                        onChange={(e) => {
                            if (!e.target.value.trim()) setMeaning(null)
                            setWord(e.target.value)
                        }} />

                    <i className="ri-search-2-line" disabled={isFetching} onChange={getMeaning}></i>
                </div>

                {
                    isFetching && <div className='meaning color-gray border-0'>
                        Loading... please wait
                    </div>
                }


                {
                    (!isFetching && !meaining) && <div className='meaning color-gray border-0'>
                        Click on search icon or enter a valid word!
                    </div>
                }


                {(meaining && !isFetching) && <div className='meaning color-black'>
                    <p>
                        <span className='color-gray'>
                            Phonetics: {" "}
                        </span>
                        {meaining?.phonetic}
                    </p>

                    {
                        meaining?.meanings?.map((mean, inx) => <div className='definitions-container' key={inx}>
                            <p>
                                {mean.partOfSpeech}
                            </p>
                            <ul>
                                {mean.definitions.map((def, ind) => <li key={'def' + ind}>
                                    {def.definition}
                                </li>)}
                            </ul>
                        </div>)
                    }
                </div>
                }

            </div>
        </div>
    )
}

export default Dictionary
