import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, createHashRouter, HashRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import BinaryTree from './components/BinaryTree/BinaryTree';
import Path from './components/Path/Path';

function App() {
  let routers = createHashRouter([
    {
      path: '/', children: [
        { index: true, element: <Home /> },
        { path: 'search', element: < Search /> },
        { path: 'binarytree', element: < BinaryTree /> },
        { path: 'shortestpath', element: < Path /> }
      ]
    }
  ])
  return (
    <RouterProvider router={routers} />
  );
}

export default App;
