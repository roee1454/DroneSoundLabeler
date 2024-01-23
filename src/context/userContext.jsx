import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebase_config";

export const UserContext = createContext({});

export const signInWithGoogle = async () => signInWithPopup(auth, provider);

export const onAuthStateChangedEventListener = (callback) => onAuthStateChanged(auth, callback);

export const handleSignOut = () => signOut(auth);

export const UserProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        onAuthStateChangedEventListener((user) => {
            try {
                if (user) {
                    setUserData(user);
                } else {
                    setUserData(null);
                }
            } catch (e) {

            } finally {
                setLoading(false);
            }
        })
    }, [])

    return (
        <UserContext.Provider
            value={{
                userData,
                loading,
                setUserData
            }}>{children}
        </UserContext.Provider>
    )
}