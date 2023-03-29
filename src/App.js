 import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './nav/NavBar';
import Login from "./home/Login"
import ListEvent from "./home/ListEvent"
import AddEvent from "./home/AddEvent"
import Home from './home/Home';
function App() {
  return (
    <> 

    <NavBar/>
    <Routes>
      <Route element={<Login/>} path="/"/>         
      {/* <Route element={<Home />} path="/home" />   */}
      <Route element={<AddEvent />} path="/add" />  
      <Route element={<ListEvent/>} path="/list"/> 
    </Routes>
    </>
    
  );
}

export default App;
