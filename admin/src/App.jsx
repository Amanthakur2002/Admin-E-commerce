import Layout from "./components/layout/Layout"
import Login from "./components/login/Login"
import { Routes, Route } from "react-router-dom"
import Missing from "./components/missing/Missing"
import User from "./components/User/User"
import Role from "./components/Role/Role"
import Dashboard from "./components/dashboard/Dashboard"
import Category from "./components/category/Category"
import Subcategory from "./components/subcategory/Subcategory"


function App() {

  return (
<Routes>
  <Route path="/" element={<Layout/>}>
    {/* { Public Routes } */}
    <Route path="/" element={<Login/>}/>

    {/* { Protected Routes} */}


    <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user" element={<User />} />
       <Route path="/roles" element={<Role />} /> 
        <Route path="/category" element={<Category />} /> 
        <Route path="/subcategory" element={<Subcategory />} /> 


    {/* { catch all} */}
    <Route path="*" element={<Missing/>}/>

  </Route>
</Routes>
)}

export default App

