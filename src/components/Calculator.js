import React, { useState } from 'react';

const Calculator = () => {
    const buttons = [
        [['AC', "ri-delete-bin-line"], ['root', "ri-square-root"], ['%', "ri-percent-line"], ['/', "ri-divide-line"]],
        [['7', 'ri-number-7'], ['8', 'ri-number-8'], ['9', 'ri-number-9'], ['*', "ri-close-line"]],
        [['4', 'ri-number-4'], ['5', 'ri-number-5'], ['6', 'ri-number-6'], ['-', "ri-subtract-line"]],
        [['1', 'ri-number-1'], ['2', 'ri-number-2'], ['3', 'ri-number-3'], ['+', "ri-add-line"]],
        [['0', 'ri-number-0'], ['.', ''], ['Del', 'ri-delete-back-2-fill'], ['=', 'ri-equal-line']],
    ];

    const operators = ['/', '+', '*', '-'];
    const [eqtn, setEqtn] = useState('');

    const btnClick = (btn) => {
        switch (btn) {
            case 'AC':
                setEqtn('');
                break;
            case '=':
                getAns();
                break;
            case 'root':
                if (eqtn) setEqtn(Math.sqrt(parseFloat(eqtn)).toString());
                break;
            case 'Del':
                setEqtn(eqtn.slice(0, -1));
                break;
            default:
                if (operators.includes(btn)) {
                    if (eqtn.length && operators.includes(eqtn[eqtn.length - 1])) {
                        setEqtn(eqtn.slice(0, -1) + btn);
                    } else {
                        setEqtn(eqtn + btn);
                    }
                } else {
                    setEqtn(eqtn + btn);
                }
                break;
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
        <div className="calculator mt-5">
            <h2 className='bold my-3'>Calculator</h2>

            <div className="card">
                <div className="card-body">
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control text-center outline-none"
                            value={eqtn}
                            readOnly
                            style={{ fontSize: '2rem' }}
                        />
                    </div>
                    {buttons.map((row, i) => (
                        <div className="d-flex justify-content-center mb-2" key={`row--${i}`}>
                            {row.map((btn, j) => (
                                <button
                                    className={`btn btn-outline-secondary rounded-circle m-1 ${btn[0] === 'AC' ? 'btn-warning' : ''}`}
                                    style={{ width: '60px', height: '60px', fontSize: '1.5rem' }}
                                    key={`col-btn-${j}`}
                                    onClick={() => btnClick(btn[0])}
                                >
                                    {btn[1] ? <i className={btn[1]}></i> : btn[0]}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Calculator;
