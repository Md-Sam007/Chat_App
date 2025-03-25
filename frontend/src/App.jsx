import Flayout from "./components/Layout/fLayout";
import Login from "./components/Login/Login";
import Signup from "./components/Login/SingUp";
import "./index.css";
import "./scroll.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
export default function App(){
   
    
   
    
    return (

        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/SignUp" element={<Signup/>}/>
                <Route exact path="/Chat/:jwtToken/:name" element={<Flayout/>}/>
            </Routes>
        </Router>
    )
}