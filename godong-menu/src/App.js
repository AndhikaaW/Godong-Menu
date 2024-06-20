// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPages from './Pages/LoginPages';
import SignUpPages from './Pages/SignUpPages';
import { HomePages } from './Pages/HomePages';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPages/>} />
        <Route path="/signup" element={<SignUpPages/>} />
        <Route path="/home" element={<HomePages/>} />
      </Routes>
    </Router>
  );
}

export default App;
