import * as React from 'react';
// import "./mainlayout.css"
import {Menu} from "antd";
import { Route , Routes, useNavigate} from "react-router-dom";
import Header from './components/header/Navbar'; 

import {
  UilEstate,
  UilUsersAlt,
  UilClipboardNotes,
  UilApps,
  UilDropbox,
  UilShop,
  UilBookReader,
  UilTagAlt,
  UilBox
} from "@iconscout/react-unicons";



function Appi(){
  const navigate = useNavigate()
  return(
    <>

    <div style={{display:"flex", flexDirection:"row"}}>
      
      <div className="sidebar">
     
      <Menu className="menu" onClick={({key})=>{
          if(key === "signout"){

          }
          else{
            navigate(key);
          }
      }} 
      items={
        [
          {icon:<UilEstate/>, label: "Dashboard", key:"/dashboard"},
          {icon:<UilUsersAlt/>, label: "Users", key:"/user"},
          {icon:<UilClipboardNotes/>, label: "Roles", key:"/roles"},
          {icon:<UilApps/>, label: "Category", key:"/category"},
          {icon:<UilDropbox/>, label: "Sub-Category", key:"/subcategory"},
          {icon:<UilShop/>, label: "Retailers", key:"/retailers"},
          {icon:<UilBookReader/>, label: "Customers", key:"/customers"},
          {icon:<UilTagAlt/>, label: "Offers", key:"/offers"},
          {icon:<UilBox/>, label: "Third Party Products"},
        ]
      }>
      </Menu>
      </div>
      <div>
      </div>
    </div>
    
    </>
    
  )
}

export default Appi;

