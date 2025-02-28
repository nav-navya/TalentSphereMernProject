import { useState, useEffect } from 'react';
import { getBackendData } from './api'
import Register from './Pages/Register';
import Login from './Pages/Login';
import Header from './Components/Fhome/Header';
import {Route,Routes} from 'react-router-dom'


import './App.css'
import MainSection from './Components/Fhome/MainSection';

function App() 
{
 
  return (
  <div>
    {/* <Routes>
      <Route path='/Register' element= {<Register/>}/>
      <Route path='/' element= {<Login/>}/>
    </Routes>  */}

    <Header/>

    <MainSection/>
    
  </div>
  
);
}


export default App


