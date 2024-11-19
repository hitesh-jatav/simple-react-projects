import React, { useState } from 'react'
import MemoryCard from './MemoryCard'
import find from "../assets/images/find.jpg"
import bheem from "../assets/images/bheem.jpg"
import pokemon from "../assets/images/pokemon.jpg"
import tomJerry from "../assets/images/tomjerry.jpg"
import ben10 from "../assets/images/ben10.jpg"
import shinchan from "../assets/images/shinchan.jpg"
import panda from "../assets/images/panda.jpg"
import oggy from "../assets/images/oggy.jpg"
import jemy from "../assets/images/jemmy.jpeg"
import hotel from "../assets/images/hotelTr.jpeg"
import doreamon from "../assets/images/doreamon.jpg"

const list = [
    'doreamon',
    'bheem', 'pokemon', 'tomJerry', 'ben10',
    'shinchan', 'jemy', 'hotel', 'oggy', 'panda'
]

const cardIndex = {
    'doreamon': doreamon,
    'bheem': bheem,
    'pokemon': pokemon,
    'tomJerry': tomJerry,
    'ben10': ben10,
    'shinchan': shinchan,
    'panda': panda,
    'jemy': jemy,
    hotel,
    oggy
}

function shuffleArray(arr) {
    let extendedArray = [...arr, ...arr]
    for (let i = extendedArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [extendedArray[i], extendedArray[j]] = [extendedArray[j], extendedArray[i]]; // Swap elements
    }

    return extendedArray;
}

const Memory = () => {

    const [cards, setCards] = useState(shuffleArray(list))
    const [lastShuffled, setLastShuffled] = useState(null)
    const [matched, setMatched] = useState([]);

    const getImage = (id) => {
        return cardIndex[id]
    }

    const shuffled = (id) => {
        if (!lastShuffled) {
            console.log('55')
            setLastShuffled(id)
            return;
        }

        if (lastShuffled !== id) {
            setLastShuffled(id)
            console.log(633)
            return;
        }

        if (matched.length === (list.length - 1)) {
            alert('You won!');
            resetGame();
        } else {
            setMatched([...matched, id])
        }
    }

    const resetGame = () => {
        setMatched([])
        setCards(shuffleArray(list))
    }
    return (
        <div className='memory-card'>

            {cards.map((card) => <MemoryCard
                id={card}
                image={getImage(card)}
                question={find}
                shuffled={(id) => shuffled(id)}
                dontHide={matched.includes(card)}
            />)}


            <div className='d-flex align-items-center'>

                <button className='location-icon' onClick={() => resetGame()}>
                    Reset the Game
                </button>

                <h2>
                    {matched.length} Matched
                </h2>
            </div>


        </div>
    )
}
export default Memory
