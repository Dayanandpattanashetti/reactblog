import Topbar from './components/topbar/Topbar';
import Home from './pages/home/Home';
import Single from './pages/single/Single';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Context } from './context/Context';

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <Topbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/posts' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/post/:id' element={<Single />} />
        <Route path='/write' element={user ? <Write /> : <Login />} />
        <Route path='/settings' element={user ? <Settings /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;