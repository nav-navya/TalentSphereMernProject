
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
// import AdminRoute from './Components/AdminRoute'
// import AdminDashboard from './Components/AdminLayout'
import AdminLayout from './Components/AdminLayout'
import { io } from 'socket.io-client'
import { useEffect } from 'react'
import Chat from './pages/Chat'
import Dashboard from './pages/Dashboard'
import UsersPage from './pages/UsersPage'
import ProjectsPage from './pages/ProjectsPage'
import TransactionsPage from './pages/TransactionsPage'
import SettingsPage from './pages/SettingsPage'
import AdminLogout from './Components/AdminLogOut'

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

         

              {/* --------------Admin-------------- */}
          <Route path="/admin" element={<AdminLayout />} >
            <Route path='logout' element={<AdminLogout/>}/>
            <Route index element={<Dashboard />} />
            <Route path='/admin/users' element={<UsersPage/>}/>
            <Route path='/admin/projects' element={<ProjectsPage/>}/>
            <Route path='/admin/transactions' element={<TransactionsPage/>}/>
            <Route path='/admin/settings' element={<SettingsPage/>}/>
          </Route>
        
         

    </Routes>  
  

    
    
             
   
    </>
  )
}

export default App



