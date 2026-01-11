import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import Registration from './pages/registration';
import {Toaster} from 'react-hot-toast';
import UserDash from './pages/UserDash';
import AdminDash from './pages/AdminDash';


function App() {
  return (
    <Router>
      <Toaster/>
      <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="/login" element={<Login/>} />
           <Route path="/register" element={<Register/>} />
           <Route path="/contact" element={<Contact/>} />
           <Route path="/registration" element={<Registration/>} />
           <Route path="/userdash" element={<UserDash/>} />
           <Route path="/admindash" element={<AdminDash/>} />
      </Routes>
    </Router>
  )
}

export default App
