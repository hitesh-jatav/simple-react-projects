import React, { useState } from 'react'

const PasswordGenerator = () => {
    const [checks, SetChecks] = useState({
        upperCase: true,
        lowerCase: true,
        number: true,
        characters: true
    });
    const [password, setPassword] = useState('')

    const [length, setLength] = useState(8);

    const changes = (data) => {
        SetChecks({ ...checks, ...data })
    }


    const getArrList = {
        upperCase: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
        lowerCase: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        number: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
        characters: ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '-', '_', '+']

    }

    const generate = () => {
        try {
            let password = '';
            let conditionsMatched = [];
            for (const key in checks) {
                if (checks[key]) conditionsMatched.push(key);
            }
            conditionsMatched.map((wo, index) => {
                let arr = getArrList[wo];
                let count = Math.floor(length / conditionsMatched.length);
                if (index + 1 === conditionsMatched.length) count = length - password.length;
                while (count > 0) {
                    let randomNum = createRandomNumber(arr.length);
                    password = (randomNum % 2 === 0) ? password + arr[randomNum] : arr[randomNum] + password;
                    count--
                }
            })
            setPassword(password)
        } catch (error) {
            console.log(error)
        }
    }

    const createRandomNumber = (limit) => {
        return Math.floor(Math.random() * limit);
    }

    useState(() => {
        generate()
    }, [])

    return (
        <div className='pass-page'>
            <div className='pass-wrapper'>
                <h2>Password Generator</h2>
                <h1>{password}</h1>
                <div className='input-container'>
                    <span> Password Length </span>
                    <input type='Number' min="8" value={length} onChange={(e) => setLength(e.target.value)} />
                    {length <= 7 && <span className='text-danger'>Mininum Length should be 8.</span>}
                </div>

                <div className='input-container'>
                    <span>Include UpperCase </span>
                    <input type='checkbox' className='checkbox' checked={checks.upperCase} onChange={(e) => changes({ 'upperCase': e.target.checked })} />
                </div>

                <div className='input-container'>
                    <span>Include LowerCase </span>
                    <input type='checkbox' className='checkbox' checked={checks.lowerCase} onChange={(e) => changes({ 'lowerCase': e.target.checked })} />
                </div>

                <div className='input-container'>
                    <span>Include Number </span>
                    <input type='checkbox' className='checkbox' checked={checks.number} onChange={(e) => changes({ 'number': e.target.checked })} />
                </div>


                <div className='input-container'>
                    <span>Include Special Characters </span>
                    <input type='checkbox' className='checkbox' checked={checks.characters} onChange={(e) => changes({ 'characters': e.target.checked })} />
                </div>


                {
                    !Object.values(checks).filter(e => e).length && <div className='text-danger' >Atleast a check is required!.</div>
                }
                <button disabled={length < 8 || !Object.values(checks).filter(e => e).length}
                    className={(length < 8 || !Object.values(checks).filter(e => e).length) ? 'cursor-not-allowed' : ''} onClick={generate}>
                   Re-Generate
                </button>
            </div>
        </div>
    )
}

export default PasswordGenerator