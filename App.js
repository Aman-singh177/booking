import { NavLink,Route,Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Navbar from './components/Navbar';
import Homescreen from './screens/Homescreen';
import Bookingscreen from './screens/Bookingscreen';
import { Navigate } from 'react-router-dom';



function App() {
  return (
      <div>
        <Navbar />

        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/Homescreen' element={<Homescreen />} />
          <Route path='/book/:roomid/:fromdate/:todate' element={<Bookingscreen/>} />
          <Route path="/" element={<Navigate to="/homescreen" />} />
        </Routes>
      </div>
  ); 
}

export default App;
