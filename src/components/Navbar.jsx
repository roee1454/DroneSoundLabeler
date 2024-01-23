import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserContext, handleSignOut } from '../context/userContext'

const Navbar = () => {
    const { userData } = useContext(UserContext);
    const location = useLocation();

    return (
        <div className='w-full h-[41px] bg-slate-950 text-white font-bold flex  items-center ps-3 text-md sm:text-lg md:text-xl'>
            <div className='flex gap-6 sm:gap-9 md:gap-11'>
                <p className='w-8 hover:scale-105 decoration-red-200 '><Link className={`${location.pathname === '/' && 'border-b-[3px]'}`} to={'/'}>Drone</Link></p>
                <p className='w-10 hover:scale-105 decoration-red-200'><Link className={`${location.pathname === '/upload_file' && 'border-b-[3px]'}`} to={'upload_file'}>Upload</Link></p>
                <p className='w-10 hover:scale-105 decoration-red-200'><Link className={`${location.pathname === '/excel' && 'border-b-[3px]'}`} to={'excel'}>Excel</Link></p>
            </div>
            <div className='flex justify-end w-full pe-5 items-center gap-2 md:gap-5'>
                {userData && <div onClick={handleSignOut} className='cursor-pointer hover:scale-105 text-red-500'>Sign Out</div>}
                <img className='w-[30px] h-[30px]' src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Hatal.png" alt="" />
            </div>
        </div>
    )
}

export default Navbar