import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase/firebase_config';
import { PulseLoader } from 'react-spinners'
import { GiDeliveryDrone } from "react-icons/gi";
import { SiMicrosoftexcel } from "react-icons/si";
import { MdOutlineFileDownload } from "react-icons/md";
import { toExcel } from 'to-excel'
import '../App.css'



const Excel = () => {
    const collectionRef = collection(db, "drone_tags");
    const [dataDrone, setDataDrone] = useState([]);
    const [loading, setLoading] = useState(false);


    const getAllDocs = async () => {
        setLoading(true);
        let docs = [];
        try {
            const data = await getDocs(collectionRef);
            data.docs.map((doc) => {
                docs.push(doc.data());
            });
            setDataDrone(docs);
        }
        catch (error) {
            console.error(error)
            return null;
        };
        setLoading(false);
    };

    const extractFileNameFromUrl = (url) => {
        const urlObj = new URL(url);
        return urlObj.pathname.split('/').pop();
    };



    const getDataToExcel = (DroneData) => {
        const allData = DroneData.map((item) => {
            const data =
                { drone: item.drone, wind: item.wind, signal: item.signal, otherSounds: item.otherSounds, fileName: extractFileNameFromUrl(item.downloadURL),userName:item.userName }
                ;
            return data;
        });
        return allData;
    };

    const exportToExcel = () => {
        const data = getDataToExcel(dataDrone);
        const headers = [
            { label: 'Drone', field: 'drone' },
            { label: 'Wind', field: 'wind' },
            { label: 'Signal', field: 'signal' },
            { label: 'OtherSounds', field: 'otherSounds' },
            { label: 'File', field: 'fileName' },
            { label: 'userName', field: 'userName' }
        ];
        toExcel.exportXLS(headers, data, 'droneFile')
    };

    useEffect(() => {
        getAllDocs();
    }, [])

    return (
        <div className="relative text-sm mx-auto text-white p-0">
            {!loading ? <div>
                <div onClick={exportToExcel} className='bottom-24 left-5 fixed items-center bg-opacity-90 text-2xl text-green-500 bg-slate-700 p-1 px-4 rounded-md cursor-pointer hover:bg-slate-800'>
                    <SiMicrosoftexcel />
                    <MdOutlineFileDownload className=' text-2xl'/>
                </div>
                <table className="w-full border-collapse border border-gray-800 mb-12">
                    <thead>
                        <tr>
                            <th className="border-2 border-gray-500 bg-slate-600 py-2"></th>
                            <th className="border-2 border-gray-500 bg-slate-600 py-2">Drone</th>
                            <th className="border-2 border-gray-500 bg-slate-600 py-2 px-3">Wind</th>
                            <th className="border-2 border-gray-500 bg-slate-600 py-2 px-3">Signal</th>
                            <th className="border-2 border-gray-500 bg-slate-600 py-2 px-3">Sounds</th>
                            <th className="border-2 border-gray-500 bg-slate-600 py-2 px-3">File</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataDrone.map((value, index) => (
                            <tr key={index}>
                                <td className="border-2 border-gray-500 py-2 text-center">{index+1}.</td>
                                <td className="border-2 border-gray-500 py-2 text-center">{value.drone}</td>
                                <td className="border-2 border-gray-500 py-2 text-center">{value.wind}</td>
                                <td className="border-2 border-gray-500 py-2 text-center">{value.signal}</td>
                                <td className="border-2 border-gray-500 py-2 text-center">{value.otherSounds}</td>
                                <td className=" border-2 border-gray-500 py-2  text-center max-w-[60px] overflow-hidden whitespace-nowrap overflow-ellipsis">{extractFileNameFromUrl(value.downloadURL)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> </div> :
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
    );
};

export default Excel;
