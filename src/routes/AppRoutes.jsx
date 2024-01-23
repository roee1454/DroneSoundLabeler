import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './Layout'
import DroneTagging from '../components/DroneTagging'
import UploadFile from '../components/UploadFile'
import Excel from '../components/Excel'
import { UserContext } from '../context/userContext'
import SignIn from '../components/SignIn'

const AppRoutes = () => {
    const { userData } = useContext(UserContext);
    if (!userData) {
        return <SignIn />; 
    }
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Layout />}  >
                        <Route index element={<DroneTagging />} />
                        <Route path='upload_file' element={<UploadFile/>} />
                        <Route path='excel' element={<Excel/>} />
                    </Route>
                </Routes>
            </Router>
        </div>
    )
}

export default AppRoutes