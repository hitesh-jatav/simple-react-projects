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
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Memory from './components/Memory';
import Quote from './components/Quote';

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
  },
  {
    path: 'memory',
    element: <Memory />
  },
  {
    path: 'quote',
    element: <Quote />
  }
]);

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </>
  );
}

export default App;