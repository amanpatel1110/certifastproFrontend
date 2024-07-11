import React from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import EditPage from "./pages/Edit";
import Logout from "./components/Logout";
import Addimg from "./components/Addimg";
import Validation from './pages/Validation';
import ManageTemplate from "./components/ManageTemplate";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

// import Todo from "./components/Todo";
import Aboutus from "./components/Aboutus";
import Index from "./components/Index";
import EmailVerify from "./components/EmailVerify";


function App() {
  return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Index />} />
        <Route path="/generate" element={<Home />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/addimg" element={<Addimg />} />
        <Route path="/validation" element={<Validation />} />
        <Route path='/manageTemplate' element={<ManageTemplate />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/verify" element={<EmailVerify />} />
        {/* <Route path="/todo" element={<Todo />} /> */}
      </Routes>
  );
}

export default App;