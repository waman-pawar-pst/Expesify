import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import React from 'react';
import Login from './component/Login';
import Graph from './component/Graph';
import './Layout.css'
import Layout from './component/Layout';
function App(){
    return (
     <BrowserRouter>
     <Routes>
       <Route path='/' element={<Login/>}/>
       <Route path='/layout' element={<Layout/>}/>
       <Route path='/graph' element={<Graph/>}/>
     </Routes>
     </BrowserRouter>
    );
}

export default App;
