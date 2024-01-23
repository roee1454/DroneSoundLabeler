import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import { ToastContainer } from 'react-toastify'

const Layout = () => {
    return (
        <div>
            <ToastContainer position="top-center" progressStyle={{ background: "navy" }} />
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Layout