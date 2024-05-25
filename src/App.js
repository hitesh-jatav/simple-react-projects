import './App.css';
import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dictionary from './components/Dictionary';
import Menu from './components/Menu';
import PasswordGenerator from './components/PasswordGenerator';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import TodoList from './components/Todo';
import Weather from './components/Weather';
import Quiz from './components/Quiz';

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
  },
  {
    path: '/calculator',
    element: <Calculator />
  },
  {
    path: '/todo',
    element: <TodoList />
  },
  {
    path: '/weather',
    element: <Weather />
  },
  {
    path: 'quiz',
    element: <Quiz />
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