import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, createHashRouter, Route, RouterProvider, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Search from './components/Search/Search';
import BinaryTree from './components/BinaryTree/BinaryTree';
import Path from './components/Path/Path';
import path from 'path';

function App() {
  let routers = createHashRouter([
    {
      path: '/', children: [
        { index: true, element: < Home /> },
        { path: 'search', element: <Search /> },
        { path: 'binarytree', element: <BinaryTree /> },
        { path: 'path', element: <Path /> }
      ]
    }
  ])

  return (
    // <BrowserRouter>
    //   <div className='bg-algo h-fit'>
    //     <div className="md:mx-16">
    //       <Routes>
    //         <Route path='/' element={<Home />} />
    //         <Route path='/search' element={<Search />} />
    //         <Route path='/BT' element={<BinaryTree />} />
    //         <Route path='/SP' element={<Path />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </BrowserRouter>
    <RouterProvider router={routers} />
  );
}

export default App;
