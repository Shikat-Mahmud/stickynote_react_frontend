import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Pages/Auth/Login';
import Register from './components/Pages/Auth/Register';
import Dashboard from './components/Pages/Dashboard/Dashboard';
import NotFound from './components/Pages/NotFound';
import './index.css';
import AuthLayout from './components/Layout/AuthLayout';
import GuestLayout from './components/Layout/GuestLayout';
import PublicLayout from './components/Layout/PublicLayout';
import Home from './components/Pages/Public/Home';
import About from './components/Pages/Public/About';
import Contact from './components/Pages/Public/Contact';
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
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
