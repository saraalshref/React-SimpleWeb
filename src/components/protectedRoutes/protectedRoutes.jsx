import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes(props) {

  if(localStorage.getItem('userToken') !==null){
    return props.children
  }else{
    return <Navigate to='/signin'/>
  }

}

export default ProtectedRoutes
