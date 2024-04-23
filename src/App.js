import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Clientlogin from "./component/clientlogin.js"; 
import Question from "./component/Question.js";
import Adminlogin from "./component/admin.js";
import Home from "./component/Home.js";
import Timer from "./component/Timer.js";
import Showqestion from "./component/showquestion.js";


function App() {
  
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
        <Route 
         path="/" element={<Home/>}
        ></Route>
          <Route  path="/Question" element={<Question/>}>
          </Route>
          <Route  path="/Adminlogin" element={<Adminlogin/>}>
          </Route>
          <Route  path="/Clientlogin" element={<Clientlogin/>}>
          </Route>
          <Route  path="/Timer" element={<Timer/>}>
          </Route>
          <Route  path="/showquestion" element={<Showqestion/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//:roomid dynamic generated
export default App;