import React from 'react'

const Footer = () => {
    return (
        <div className='fixed w-full bottom-0 flex justify-center items-center p-3 gap-2 bg-slate-950 text-white'>
            <div>Opened by CTO</div>
            <div><img className='w-[30px] h-[30px]' src="https://upload.wikimedia.org/wikipedia/commons/e/eb/Hatal.png" alt="" /></div>
            <div><img className='w-[30px] h-[30px]' src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Badge_of_the_Israeli_Defense_Forces_2022_version.svg/1200px-Badge_of_the_Israeli_Defense_Forces_2022_version.svg.png" alt="" /></div>
        </div>
    )
}

export default Footer