import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import CheckboxGroup from "./CheckboxGroup";
import { GiDeliveryDrone } from "react-icons/gi";
import { db } from "../firebase/firebase_config";
import SoundDrone from "./SoundDrone";
import { AppContext } from "../context/soundContext";
import { PulseLoader } from "react-spinners";
import { addDoc, collection } from "firebase/firestore";
import { UserContext } from '../context/userContext'
import { toast } from 'react-toastify'

function DroneTagging() {
  const { loading, filesToLabel, setFilesToLabel, fetchUnlabeledFiles } =
    useContext(AppContext);

  const { userData } = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const labelFile = async (data) => {
    const LabeledFilesCollection = collection(db, "drone_tags");
    await addDoc(LabeledFilesCollection, {
      drone:
        data.drone === "Drone" ? "1" : data.drone === "Not a Drone" ? "0" : "2",
      wind: data.wind,
      signal: data.signal,
      otherSounds: data.input,
      fileName: filesToLabel[filesToLabel.length - 1].fileName,
      downloadURL: filesToLabel[filesToLabel.length - 1].downloadURL,
      userName: userData.displayName,
      createdAt: Date.now(),
    });

    setFilesToLabel((prevFiles) =>
      prevFiles.filter(
        (file) => file.fileName !== prevFiles[prevFiles.length - 1].fileName
      )
    );

    reset();

    toast("הקובץ תויג בהצלחה, נקסט!!")

    if (filesToLabel.length === 1) {
      fetchUnlabeledFiles();
    }
  };


  return (
    <div className="flex justify-center mt-5 mb-11 ">
      {!loading ? (
        <div className="space-y-7 text-white bg-slate-800 border rounded-xl py-3 p-1 m-2">
          <SoundDrone sound={filesToLabel[filesToLabel.length - 1]} />
          <form
            className="flex flex-col gap-6 items-center"
            onSubmit={handleSubmit(labelFile)}
          >
            <CheckboxGroup
              label="Is it a Drone?"
              options={["Drone", "Not a Drone", "Not Sure"]}
              registerKey="drone"
              errorsKey={errors.drone}
              register={register}
            />
            <CheckboxGroup
              label="Wind Strength:"
              options={["0", "0.5", "1"]}
              registerKey="wind"
              errorsKey={errors.wind}
              register={register}
            />
            <CheckboxGroup
              label="Signal Strength:"
              options={["1", "2", "3"]}
              registerKey="signal"
              errorsKey={errors.signal}
              register={register}
            />
            <div className="flex flex-col items-center gap-2">
              <label className="text-center font-bold px-3">
                Other Sounds(such as,Speaking,Engine noises,etc...):
              </label>
              <input
                type="text"
                placeholder="what a anoise . . ."
                className="w-[60%] max-w-[270px] h-[30px] rounded-md text-black p-4"
                {...register("input")}
              />
            </div>
            <button
              className="w-[80%] max-w-[300px] rounded-lg border-2 border-blue-500 p-2 px-10 hover:bg-blue-500 hover:text-white duration-200 font-bold"
              type="submit"
            >
              <div className="flex justify-center items-center gap-3">
                <span className="text-xl">Submit</span>{" "}
                <GiDeliveryDrone className="text-2xl" />
              </div>
            </button>
          </form>
        </div>
      ) : (
        <div className="flex gap-2 items-center pt-10">
          <GiDeliveryDrone className="text-5xl text-white animate-bounce" />
          <p className="text-white text-3xl">
            Loading{" "}
            <span>
              <PulseLoader color="#ffffff" size={7} speedMultiplier={0.7} />
            </span>{" "}
          </p>
        </div>
      )}
    </div>
  );
}

export default DroneTagging;
