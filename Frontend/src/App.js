import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Clientlogin from "./component/clientlogin.js"; 
import Question from "./component/Question.js";
import Adminlogin from "./component/admin.jsx";
import Home from "./component/Home.js";
import Timer from "./component/Timer.js";
import Showqestion from "./component/showquestion.js";
import Sign from "./component/sign.js"
import Buzzer from "./component/buzzer.js"
import Adminebuzzer from "./component/adminebuzzer.js";


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
          <Route  path="/sign" element={<Sign/>}>
          </Route>
          <Route  path="/showquestion" element={<Showqestion/>}>
          </Route>
          <Route  path="/buzzer" element={<Buzzer/>}>
          </Route>
          <Route  path="/adminebuzzer" element={<Adminebuzzer/>}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
//:roomid dynamic generated
export default App;
