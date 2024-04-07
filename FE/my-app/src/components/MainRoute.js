import React from 'react'
import {Routes,Route} from "react-router-dom"
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import TaskMain from '../pages/TaskMain'
const MainRoute = () => {
  return (
    <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/task' element={<TaskMain/>}/>
    </Routes>
  )
}

export default MainRoute
