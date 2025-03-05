
// import './App.css'
import MainSection from './Components/Client/Home/MainSection'
import Navbar from './Components/Client/Home/Navbar'
import Login from './Components/Login'
import Register from './Components/Register'
import {Route,Routes} from 'react-router-dom'
import CreateProject from './pages/Client/ClientCreateProject'
import Home from './Components/Client/Home/Home'
import Profile from './pages/Client/ViewProfile'
import AddmoreDetails from './pages/Client/AddmoreDetails'
import Layout from './layouts/layout'
import ClientProjects from './pages/Client/ClientViewProjects'
import JobCategory from './Components/Freelancer/JobCategory'



import Main from './pages/Freelancers/Home/Main'

function App() {
 
  return (
    <>
     {/* Client */}
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

{/*     
<Main/>
<JobCategory/>
     */}
    
   

     
    </>
  )
}

export default App
