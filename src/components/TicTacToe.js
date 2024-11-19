import React, { useState, useEffect, useRef } from 'react';

const TicTacToe = () => {
    const nums = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    const [axis, setAxis] = useState([]);
    const [zeroes, setZeroes] = useState([]);
    const [isTurnX, setIsTurnX] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const modalRef = useRef(null);

    const winnerSet = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    const isSubset = (subsetArray, mainArray) => {
        return subsetArray.every(element => mainArray.includes(element));
    };

    const checkWon = (col) => {
        let won;
        if ((isTurnX && axis.length < 2) || (!isTurnX && zeroes.length < 2)) {
            setIsTurnX(!isTurnX);
            return;
        }
        if (isTurnX) {
            won = winnerSet.find(set => isSubset(set, [...axis, col]));
        } else {
            won = winnerSet.find(set => isSubset(set, [...zeroes, col]));
        }
        if (won) {
            setTimeout(() => {
                setIsModalVisible(true);
            }, 100);
        } else {
            if (axis.length + zeroes.length === 8) closeModal()
            else setIsTurnX(!isTurnX);
        }
    };

    const buttonClicked = (col) => {
        if (axis.includes(col) || zeroes.includes(col)) {
            return;
        }
        if (isTurnX) {
            setAxis([...axis, col]);
        } else {
            setZeroes([...zeroes, col]);
        }
        checkWon(col);
    };

    const closeModal = () => {
        setAxis([]);
        setZeroes([]);
        setIsTurnX(false)
        setIsModalVisible(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && event.target === modalRef.current) {
                closeModal();
            }
        };

        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);


    return (
        <div className='tic-tac-toe-wrapper'>
            <div className='tic-tac-toe'>
                {
                    nums.map((row, i) => (
                        <div key={'row-' + i} className='row-box d-flex justify-content-evenly'>
                            {row.map((col, j) => (
                                <div
                                    className={
                                        zeroes.includes(col) ? 'col-box color-o' : axis.includes(col) ? 'col-box color-x' : 'col-box'
                                    }
                                    onClick={() => buttonClicked(col)}
                                    key={'col-' + j}
                                >
                                    <span>
                                        {zeroes.includes(col) ? 'O' : axis.includes(col) ? 'X' : ''}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ))
                }
            </div>
            {isModalVisible && (
                <div ref={modalRef} id="myModal"
                    className={'modal'} style={{ display: 'block' }}>
                    <div className={`modal-content ${isTurnX ? 'color-x' : 'color-o'}`}>
                        <span className="close" onClick={() => closeModal()}>&times;</span>
                        <p>Congratulations, {isTurnX ? 'X' : 'O'} won the game!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TicTacToe;
