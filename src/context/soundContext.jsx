import { createContext, useContext, useEffect } from "react";
import { useState } from "react";
import { list, ref, getDownloadURL } from "firebase/storage";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import { db, fileDb } from "../firebase/firebase_config";

export const AppContext = createContext(null);

export const SoundProvider = ({ children }) => {
  const [filesToLabel, setFilesToLabel] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const LabeledFilesCollection = collection(db, "drone_tags");

  const getFirestoreFileNames = async () => {
    const queryDocRef = query(LabeledFilesCollection);
    const querySnapshot = await getDocs(queryDocRef);
    let labledFileNames = [];
    querySnapshot.forEach(snapshot => {
      if (snapshot.exists()) labledFileNames.push(snapshot.data().fileName);
    });
    return labledFileNames;
  }

  const fetchUnlabeledFiles = async () => {
    setLoading(true);
    const batchSize = 10;
    const maxResults = 100;
    const labeledFileNames = await getFirestoreFileNames();
    const storageRef = ref(fileDb);
    const unlabeledFilesQuery = await list(storageRef, { maxResults });
    const unlabeledFileNames = await Promise.all(
      unlabeledFilesQuery.items.map(async (file) => {
        const isFileLabeled = labeledFileNames.includes(file.name);
        return isFileLabeled ? null : file.name;
      })
    );


    const filteredFileNames = unlabeledFileNames
      .filter((name) => name !== null)
      .slice(0, batchSize);

    

    const filePromises = filteredFileNames.map(async (name) => {
      const fileRef = ref(storageRef, name);
      const downloadURL = await getDownloadURL(fileRef);
      return { fileName: name, downloadURL };
    });

    const newFiles = await Promise.all(filePromises);
    
    // Update state with the new files to be labeled
    setFilesToLabel(newFiles);
    setLoading(false);
  };

  useEffect(() => {
    fetchUnlabeledFiles();
  }, []);



  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        fetchUnlabeledFiles,
        filesToLabel,
        setFilesToLabel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
