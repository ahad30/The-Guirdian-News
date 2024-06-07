import { createContext, useEffect, useState } from "react";
import {GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword,signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const axiosPublic = useAxiosPublic();
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        // setLoading(true);
        return createUserWithEmailAndPassword(auth, email , password);
    }

    const signIn = (email, password) => {
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    
    const signInWithGoogle = () =>{
        setLoading(false);
        return signInWithPopup(auth, googleProvider);
    }
    const signInWithGithub = () =>{
        setLoading(false);
        return signInWithPopup(auth, githubProvider);
    }


    const logOut = async () => {
        setLoading(false);
        return signOut(auth);
    }

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // console.log(currentUser )
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res?.data?.token) {
                            // console.log(res?.data?.token)
                            localStorage.setItem('access-token', res?.data?.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        signInWithGoogle,
        signInWithGithub,
        logOut,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;