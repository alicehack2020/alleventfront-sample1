 import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './nav/NavBar';
import Login from "./home/Login"
import ListEvent from "./home/ListEvent"
import AddEvent from "./home/AddEvent"
import Protected from './protect/Protected ';
import NotFound from './home/NotFound';

function App() {
   return (
    <> 
    <NavBar/>
    <Routes>
      <Route element={<Login/>} path="/"/>         
      <Route element={<NotFound/>} path="*"/>         
      <Route path="/add" element={<Protected><AddEvent /></Protected>} /> 
      <Route path="/list" element={<Protected><ListEvent /></Protected>} /> 

     </Routes>
    </>
    
  );
}

export default App;
