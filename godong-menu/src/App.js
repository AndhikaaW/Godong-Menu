// import logo from './logo.svg';
// import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPages from './Pages/LoginPages';
import SignUpPages from './Pages/SignUpPages';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPages/>} />
        <Route path="/signup" element={<SignUpPages/>} />
      </Routes>
    </Router>
  );
}

export default App;
