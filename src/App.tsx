import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, createBrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import BinaryTree from './components/BinaryTree/BinaryTree';
import Path from './components/Path/Path';

function App() {
  let routes = createBrowserRouter([
    {
      path: '/', children: [
        { path: "*", element: <Home /> },
        { path: "BT", element: <BinaryTree /> },
        { path: "search", element: <Search /> },
        { path: "SP", element: <Path /> }
      ]
    }
  ])

  return (
    <BrowserRouter>
      <div className='bg-algo h-fit'>
        <div className="md:mx-16">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/search' element={<Search />} />
            <Route path='/BT' element={<BinaryTree />} />
            <Route path='/SP' element={<Path />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
