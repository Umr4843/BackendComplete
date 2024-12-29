import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from 'react'

const Dashboard = () => {
    const token = localStorage.getItem('userToken')
    const [user,setUser]=useState(null)
    const decodedToken = jwtDecode(token)
    const fetchUser=async()=>{
        const response=await axios.get(`http://localhost:8082/api/admin/users/${decodedToken.id}`)
         setUser(response.data.user)
    }
    useEffect(()=>{
        fetchUser()
    },[])
  return (
    <div>
        <h1>{`Hello ${user?.name}`}</h1>
    </div>
  )
}

export default Dashboard