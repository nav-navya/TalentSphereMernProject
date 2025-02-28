
// import './App.css'
import MainSection from './Components/Home/MainSection'
import Navbar from './Components/Home/Navbar'
import Login from './Components/Login'
import Register from './Components/Register'
import {Route,Routes} from 'react-router-dom'

function App() {
 
  return (
    <>
{/*      
      <Routes>
      <Route path='/Register' element= {<Register/>}/>
      <Route path='/' element= {<Login/>}/>
    </Routes>  */}

    <Navbar/>
    <MainSection/>
    

     
    </>
  )
}

export default App
