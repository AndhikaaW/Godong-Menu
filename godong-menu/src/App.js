// import logo from './logo.svg';
// import './App.css';
// import SignUp from './Components/SignUp/SignUp';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/SignUp/SignUp';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <SignUp/>
    // <Login/>
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/signup" element={<SignUp />} />
    //   </Routes>
    // </Router>
  );
}

export default App;
