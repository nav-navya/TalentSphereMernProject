
// import './App.css'
import MainSection from './Components/Home/MainSection'
import Navbar from './Components/Home/Navbar'
import Login from './Components/Login'
import Register from './Components/Register'
import {Route,Routes} from 'react-router-dom'
import CreateProject from './pages/ClientCreateProject'
import Home from './Components/Home/Home'
import Profile from './pages/ViewProfile'
import AddmoreDetails from './pages/AddmoreDetails'
import Layout from './layouts/layout'
import ClientProjects from './pages/ClientViewProjects'

function App() {
 
  return (
    <>
     
    <Routes>
      <Route path='/Register' element= {<Register/>}/>
      <Route path='/' element= {<Login/>}/>

      <Route path='/' element={<Layout/>}>
        <Route path='/createProject' element= {<CreateProject/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path="/client/:clientId" element={<ClientProjects />} />
        
      </Route>
    </Routes> 

    

    
    
   

      
     
    </>
  )
}

export default App
