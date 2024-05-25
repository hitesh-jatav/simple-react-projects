import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dictionary from './components/Dictionary';
import Menu from './components/Menu';
import PasswordGenerator from './components/PasswordGenerator';
import TicTacToe from './components/TicTacToe';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Menu />
  },
  {
    path: '/dictionary',
    element: <Dictionary />
  },
  {
    path: '/password-generator',
    element: <PasswordGenerator />
  },

  {
    path: '/tic-tac-toe',
    element: <TicTacToe />
  }

]);

function App() {

  return (
    <div className='App'>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;