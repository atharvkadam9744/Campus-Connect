import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Faculty from "./pages/Faculty";
import Student from "./pages/Student";
import Signup from "./pages/Signup";

function App() {

  return (

    <BrowserRouter>

     <Routes>

  <Route path="/" element={<Home />} />

  <Route path="/faculty" element={<Faculty />} />

  <Route path="/student" element={<Student />} />

  <Route path="/signup" element={<Signup />} />

</Routes>

    </BrowserRouter>
  );
}

export default App;