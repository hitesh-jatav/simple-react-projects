import React from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {
    const list = [
        { name: 'Dictionary', path: '/dictionary', bg: 'dict' },
        { name: 'Password Generator', path: '/password-generator', bg: 'pass' },
        { name: 'Tic Tac Toe', path: '/tic-tac-toe', bg: 'ttt' },
    ]
    return (

        <div>
            <h1>Menu</h1>
            <div className='d-flex menu-container'>
                {
                    list.map((e, index) => <div key={'icons' + index} className={'menu-icon ' + e.bg}>
                        <Link to={e.path} className='icon-card'>
                            {e.name}
                        </Link>
                    </div>)
                }
            </div>
        </div>
    )
}

export default Menu
