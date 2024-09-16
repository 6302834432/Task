import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home/Home'
import Login from './Pages/Login/Login'
import CreateEmployee from './Pages/CreateEmployee/CreateEmployee'
import EmployeeList from './Pages/EmployeeList/EmployeeList'
import EditEmployee from './Pages/EditEmployee/EditEmployee'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/employeelist' element={<EmployeeList />} />
            <Route path='/login' element={<Login />} />
            <Route path='/createemployee' element={<CreateEmployee/>}/>
            <Route path='/editEmployee/:id' element={<EditEmployee/>}/>

        </Routes>
    )
}

export default AppRoutes