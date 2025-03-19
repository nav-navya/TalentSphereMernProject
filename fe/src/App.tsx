
// import './App.css'
import MainSection from './Components/Client/Home/MainSection'
import Navbar from './Components/Client/Home/Navbar'
import Login from './Components/Login'
import Register from './Components/Register'
import {Route,Routes} from 'react-router-dom'
import CreateProject from './pages/Client/ClientCreateProject'
import Home from './Components/Client/Home/Home'
import Profile from './pages/Shared/ViewProfile'
import AddmoreDetails from './pages/Client/AddmoreDetails'
import Layout from './layouts/layout'
import ClientProjects from './pages/Client/ClientViewProjects'
import JobCategory from './Components/Freelancer/JobCategory'
import Main from './pages/Freelancers/Home/Main'
import { FreelancerViewProject } from './pages/Freelancers/ViewProjects'
import FLayout from './layouts/FreelanceLayout'
import Landing from './Components/Landing'
import About from './pages/Freelancers/About'
import BidFormWrapper from './pages/Freelancers/BidFormWrapper'
import ProjectDetails from './Components/ProjectDetails'
import AdminRoute from './Components/AdminRoute'
import AdminDashboard from './Components/AdminDashboard'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import Chat from './pages/Chat'

const socket = io("http://localhost:5003",{
  transports:["websocket"],
  withCredentials:true,
});



function App() {

  useEffect( ()=>{
    socket.on("connected",()=>{
      console.log("Connected to Websocket:",socket.id);
    })

    socket.on("disconnected", ()=>{
      console.log("user disconnected",socket.id);
    });

    return () => {
      socket.disconnect();
    };
  },[])
 
  return (
    <>
    <Routes>
      <Route path='/Register' element= {<Register/>}/>
      <Route path='/' element= {<Login/>}/>
      <Route path='/landing' element={<Landing/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path= '/chat' element ={<Chat/>}/>
     

            {/* --------client------- */}
      <Route path='/' element={<Layout/>}>
        <Route path='/createProject' element= {<CreateProject/>}/>
        <Route path='/home' element={<Home/>}/>
        
       
        <Route path='/addmoreDetails' element={<AddmoreDetails/>}/>
        <Route path="/client/:clientId" element={<ClientProjects />} />
        
       </Route>


                   {/* ---------Freelancers --------*/}
        
         <Route path='/' element={<FLayout/>}>
            <Route path='/fHome' element={<Main/>}/>
            <Route path='/fviewProjects' element={<FreelancerViewProject/>}/>
            
            <Route path='/about' element={<About/>}/>
            <Route path="/addBid/:projectId" element={<BidFormWrapper />} />


          
          <Route path="/project/:id" element={<ProjectDetails />} />

          

         </Route>

         <Route element={<AdminRoute />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
         

    </Routes>  
  

    
    
             
   
    </>
  )
}

export default App
