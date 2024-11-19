import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-toastify';

const PasswordGenerator = () => {
    const [checks, setChecks] = useState({
        upperCase: true,
        lowerCase: true,
        number: true,
        characters: true
    });
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(8);

    const getArrList = {
        upperCase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
        lowerCase: 'abcdefghijklmnopqrstuvwxyz'.split(''),
        number: '0123456789'.split(''),
        characters: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+']
    };

    const generate = useCallback(() => {
        let password = '';
        let conditionsMatched = Object.keys(checks).filter(key => checks[key]);
    
        if (conditionsMatched.length === 0) return;
    
        conditionsMatched.forEach((type, index) => {
            let arr = getArrList[type];
            let count = Math.floor(length / conditionsMatched.length);
            if (index + 1 === conditionsMatched.length) count = length - password.length;
    
            while (count > 0) {
                const randomNum = createRandomNumber(arr.length);
                password += arr[randomNum];
                count--;
            }
        });
    
        setPassword(password);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [checks, length]);
    

    const createRandomNumber = (limit) => {
        return Math.floor(Math.random() * limit);
    };

    useEffect(() => {
        generate();
    }, [generate]); // Use the memoized generate function

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password)
            .then(() => {
                toast.success('Password Copied Successfully', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            })
            .catch(err => {
                toast.error('Something went wrong, Try again', {
                    position: 'top-right',
                    autoClose: 3000,
                });
            });
    };

    return (
        <div className="pass-page mt-5">
            <div className="text-center mb-4">
                <h2 className='bold my-3'> Password Generator</h2>
                <h1 className="border p-3 dynamic-text-box">{password || '...'}</h1>
                <button className='btn'>
                    <i className="ri-file-copy-line" onClick={copyToClipboard}></i>
                </button>
            </div>
            <div className="d-flex justify-content-center mb-4">
                <button className="btn btn-secondary me-2" onClick={() => setLength(Math.max(8, length - 1))}>-</button>
                <input
                    type="number"
                    className="form-control w-25 text-center"
                    min="8"
                    value={length}
                    onChange={(e) => setLength(Math.max(8, e.target.value))}
                />
                <button className="btn btn-secondary ms-2" onClick={() => setLength(Number(length) + 1)}>+</button>
            </div>
            {length < 8 && <span className="text-danger">Minimum Length should be 8.</span>}
            <div className="mb-3">
                {['upperCase', 'lowerCase', 'number', 'characters'].map((type) => (
                    <div className="form-check" key={type}>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={checks[type]}
                            onChange={(e) => setChecks({ ...checks, [type]: e.target.checked })}
                        />
                        <label className="form-check-label">{`Include ${type.charAt(0).toUpperCase() + type.slice(1).replace(/([A-Z])/g, ' $1')}`}</label>
                    </div>
                ))}
            </div>
            {!Object.values(checks).some(e => e) && <div className="text-danger">At least one option must be selected!</div>}
            <button
                className="btn btn-primary"
                disabled={length < 8 || !Object.values(checks).some(e => e)}
                onClick={generate}
            >
                Re-Generate
            </button>
        </div>
    );
};

export default PasswordGenerator;
