import React, { useState } from 'react';

const Calculator = () => {
    const buttons = [
        [['AC'], ['root', "ri-square-root"], ['%', "ri-percent-line"], ['/', "ri-divide-line"]],
        [['7', 'ri-number-7'], ['8', 'ri-number-8'], ['9', 'ri-number-9'], ['*', "ri-close-line"]],
        [['4', 'ri-number-4'], ['5', 'ri-number-5'], ['6', 'ri-number-6'], ['-', "ri-subtract-line"]],
        [['1', 'ri-number-1'], ['2', 'ri-number-2'], ['3', 'ri-number-3'], ['+', "ri-add-line"]],
        [['0', 'ri-number-0'], ['.', ''], ['Del', 'ri-delete-back-2-fill'], ['=', 'ri-equal-line']],
    ];

    const operators = ['/', '+', '*', '-'];

    const [eqtn, setEqtn] = useState('');

    const btnClick = (btn) => {
        if (btn === 'AC') {
            setEqtn('');
        } else if (btn === '=') {
            getAns();
        } else if (btn === 'root') {
            if (eqtn) setEqtn(Math.sqrt(parseFloat(eqtn)).toString());
        } else if (btn === 'Del') {
            setEqtn(eqtn.slice(0, -1));
        } else if (operators.includes(btn)) {
            if (eqtn.length && operators.includes(eqtn[eqtn.length - 1])) {
                setEqtn(eqtn.slice(0, -1) + btn);
            } else {
                setEqtn(eqtn + btn);
            }
        } else {
            setEqtn(eqtn + btn);
        }
    };

    const getAns = () => {
        try {
            const result = new Function(`return ${eqtn}`)();
            setEqtn(result.toString());
        } catch {
            setEqtn('Error');
        }
    };

    return (
        <div className='calc-wrapper'>
            <div className='calc-box'>
                <div className='screen'>
                    <p className='equation'>{eqtn}</p>
                </div>
                <div>
                    {
                        buttons.map((row, i) => (
                            <div key={'row--' + i} className='btn-group d-flex'>
                                {
                                    row.map((btn, j) => (
                                        <div className={`btn ${btn[0] === 'AC' ? 'orange' : ''}`}
                                            key={'col-btn-' + j}onClick={() => btnClick(btn[0])}
                                        >
                                            {btn[1] ? <i className={btn[1]}></i> : btn[0]}
                                        </div>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Calculator;
