import React, { useContext, useEffect } from 'react'
import Navbar from './../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { userContext } from '../../context/tokenContext';

function Layout() {
  const {setUserToken}=useContext(userContext)
  useEffect(()=>{
    if(localStorage.getItem('userToken') !==null){
      setUserToken(localStorage.getItem('userToken'))
    }
  })
  return (
    <>
    <Navbar/>
    <div className="container">
    <Outlet/>
    </div>
    </>
  )
}

export default Layout
