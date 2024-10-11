import React from 'react'
import './Admin.css'
import SideBar from '../../components/SideBar/SideBar'
import { Route, Routes } from 'react-router-dom'
import AddProduct from '../../components/Addproduct/AddProduct'
import ListProduct from '../../components/ListProduct/ListProduct'

const Admin = () => {
  return (
    <div className='admin'>
      <SideBar/>
      <Routes>
        <Route path='/addproduct' element={<AddProduct/>} />
        <Route path='/listproduct' element={<ListProduct/>} />
      </Routes>
    </div>
  )
}

export default Admin
