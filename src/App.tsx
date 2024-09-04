import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import BinaryTree from './components/BinaryTree/BinaryTree';
import Path from './components/Path/Path';

function App() {
  
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
