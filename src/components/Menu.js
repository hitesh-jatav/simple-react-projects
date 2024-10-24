import React from 'react';
import { Link } from 'react-router-dom';
import miniProject from "../constants"
import Header from './Header';
import Footer from './Footer';

const Menu = () => {
    const list = [
        { name: 'Dictionary', path: '/dictionary', bg: 'dict' },
        { name: 'Password Generator', path: '/password-generator', bg: 'pass' },
        { name: 'Tic Tac Toe', path: '/tic-tac-toe', bg: 'ttt' },
        { name: 'Calculator', path: '/calculator', bg: 'calc' },
        { name: 'Todo', path: '/todo', bg: 'todo' },
        { name: 'Weather', path: '/weather', bg: 'weather' },
        { name: 'Quiz', path: '/quiz', bg: 'quiz' },
    ];

    return (
        <div>
            <h1 className="text-center mt-4">Projects</h1>
            <hr />
            <div className="row px-5">
                {
                    miniProject.map((item, index) => (
                        <div key={index} className="col-md-4 mb-4" >
                            <div className={`card text-center ${item.bg}`} >
                                <div className="card-body d-flex align-items-center justify-content-center" style={{ height: '200px', width: '200px' }}>
                                    <Link to={item.path} className="stretched-link text-decoration-none">
                                        <h5 className="card-title">{item.name}</h5>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Menu;
