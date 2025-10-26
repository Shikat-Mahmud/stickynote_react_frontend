import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Register from './Pages/Auth/Register';
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Profile/Profile';
import UserProfile from './Pages/UserProfile/UserProfile';
import NotFound from './Pages/NotFound';
import './index.css';
import './font.css';
import AuthLayout from './components/Layout/AuthLayout';
import GuestLayout from './components/Layout/GuestLayout';
import PublicLayout from './components/Layout/PublicLayout';
import Home from './Pages/Public/Home';
import About from './Pages/Public/About';
import Contact from './Pages/Public/Contact';
import AuthProvider from './contexts/AuthProvider';

axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>

          <Route element={<GuestLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user-profile/:id" element={<UserProfile />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
