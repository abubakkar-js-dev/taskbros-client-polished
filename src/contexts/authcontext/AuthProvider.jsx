import { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import axios from 'axios';

const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();

    // console.log(user);

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }

    const loginUser = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    const loginWithGoogle = ()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
    }

    const updateUserProfile = (updatedInfo)=>{
        setLoading(true);
        return updateProfile(auth.currentUser,updatedInfo);
    }

    const logOutUser = ()=>{
        setLoading(true);
        return signOut(auth);
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(true); // Set loading true when the auth state changes
            
            if (currentUser?.email) {
                const user = { email: currentUser.email };
    
                axios.post(`${import.meta.env.VITE_API_URL}/jwt`, user, {
                    withCredentials: true
                })
                .then(() => {
                    setUser(currentUser);
                    setLoading(false); 
                })
                .catch(() => {
                    setLoading(false); 
                });
            } else {
                setUser(currentUser); 
                axios.post(`${import.meta.env.VITE_API_URL}/logOut`, {}, {
                    withCredentials: true
                })
                .then(() => {
                    setLoading(false); 
                })
                .catch(() => {
                    setLoading(false); 
                });
            }
        });
    
        return () => {
            unsubscribe();
        };
    }, []);
    





    const authInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUser,
        loginUser,
        loginWithGoogle,
        updateUserProfile,
        logOutUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthProvider;