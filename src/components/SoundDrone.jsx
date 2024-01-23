import React, { useContext, useEffect, useRef, useState } from 'react'
import { AppContext } from '../context/soundContext';

const SoundDrone = ({sound}) => {
    const [volume, setVolume] = useState(100);
    const audioRef = useRef(null);

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        audioRef.current.volume = newVolume / 100;
    }

    const playPauseHandler = () => {
        audioRef.current.play();
    };

    const stopHandler = () => {
        audioRef.current.pause();
    };

  
    return (
        <div className='space-y-7'>
            <div className="mt-5 buttons flex justify-center gap-10 font-bold">
                <button onClick={playPauseHandler} className='rounded-lg border-2 border-green-500  p-2 px-10 hover:bg-green-500 hover:text-white duration-200'>play</button>
                <button onClick={stopHandler} className='rounded-lg border-2 border-red-500 p-2 px-10 hover:bg-red-500 hover:text-white duration-200'>stop</button>
            </div>
            <div className='flex justify-center items-center gap-1'>
                <label className='font-bold'>Volume: {volume} </label>
                <input onChange={handleVolumeChange} value={volume} min={0} max={100} className='mt-1' type="range" name="" id="" />
            </div>
            <audio ref={audioRef} src={sound.downloadURL}></audio>
        </div>
    )
}

export default SoundDrone