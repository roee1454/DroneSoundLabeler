import React, { useContext } from 'react'
import { UserContext, signInWithGoogle } from '../context/userContext';
import { PulseLoader } from 'react-spinners'
import { GiDeliveryDrone } from "react-icons/gi";

const SignIn = () => {

    const { setUserData, loading } = useContext(UserContext);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const { user } = await signInWithGoogle();
            setUserData(user);
        } catch (e) {
            setUserData(null);
        }
    }

    return (
        <div className='h-full flex justify-center items-center m-2 mt-10'>
            {!loading ? <div className="relative w-96 rounded-xl bg-slate-800">
                <div className="flex flex-col gap-6 p-7 text-white">
                    <p className="text-center text-3xl text-gray-200 mb-5 font-bold underline">Login</p>
                    <button onClick={handleSignIn} className='flex items-center justify-center px-2 bg-white hover:bg-gray-200 focus:ring-blue-500 focus:ring-offset-blue-200 text-gray-700 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'>
                        <img className='w-10 h-10' src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="" />
                        <span className="ml-2">Sign up with Google</span>
                    </button>
                </div>
            </div> :
                <div className='flex justify-center gap-2 items-center pt-10'>
                    <GiDeliveryDrone className='text-5xl text-white animate-bounce' />
                    <p className='text-white text-3xl'>Loading <span><PulseLoader
                        color="#ffffff"
                        size={7}
                        speedMultiplier={0.7}
                    /></span> </p>
                </div>
            }
        </div>
    )
}

export default SignIn