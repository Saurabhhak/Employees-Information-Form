import { useState } from "react";
import EmployeeInfoForm from "./EmpForm";
import HomeLayout from "./HomeLayout";
import LoginForm from "./Logs";
import SignUpForm from "./Signup";
import Dashboard from "./Dashborad";
import Feature from "./Feature";
import Profile from "./Profile";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<EmployeeInfoForm />} />
          <Route path="/feature" element={<Feature />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
