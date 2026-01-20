import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Registration from './pages/registration';
import {Toaster} from 'react-hot-toast';
import UserDash from './pages/UserDash';
import AdminDash from './pages/AdminDash';
import EditUser from './pages/EditUser';
import ProtectedRoute from './protected/ProtectedRoute';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Toaster/>
      <Header/>
      <Routes>
           <Route path="/home" element={<Home/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/contact" element={<Contact/>} />
           <Route path="/" element={<Registration/>} />
           <Route path="/userdash" element={<UserDash/>} />
           <Route path="/admindash" element={
            <ProtectedRoute allowedRoles={['admin']} element={<AdminDash/>}
           />}
            />
           <Route path="/edituser/:id" element={
           <ProtectedRoute allowedRoles={['admin']} element={<EditUser/>}
          />} 
            />
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
