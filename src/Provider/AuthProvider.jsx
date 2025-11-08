import React, { createContext, useEffect, useState } from 'react'
import app from '../Firebase/firebase.config'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'


const AuthContext = createContext()
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password)=>{
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password)=>{
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signInWithGoogle = ()=>{
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = ()=>{
        return signOut(auth)
    }

    const updateUser = (updatedData)=>{
        return updateProfile(auth.currentUser, updatedData)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false)
        })

        return ()=>{
            unsubscribe()
        }
    },[])

    const authData = {
        createUser,
        logIn,
        signInWithGoogle,
        logOut,
        updateUser,
        user,
        setUser,
        loading
    }

  return <AuthContext value={authData}>{children}</AuthContext>
}

export {AuthContext}
export default AuthProvider