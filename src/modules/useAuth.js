import { ref, computed } from 'vue';
import { firebaseApp } from './firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword  } from 'firebase/auth';

import { doc, setDoc } from "firebase/firestore"
import { db } from './firebase.js'


const auth = getAuth(firebaseApp);

const currentUser = ref(null);

const isLoggedIn = computed(() => !!currentUser.value) // returns true if currentUser is not null; used for conditional rendering; if the value is null, the user is not logged in


const authError = ref(null);
const loading = ref(false);

// Add auth ready promise to wait for Firebase auth initialization
let resolveAuthReady
export const authReady = new Promise((resolve) => {
    resolveAuthReady = resolve
})

onAuthStateChanged(auth, (user) => {
    currentUser.value = user
    resolveAuthReady() // resolve when auth state is known
})

// Firestore helper functions directly in useAuth
const createUserProfile = async (userId, userData) => {
    console.log('👥 Creating user profile for:', userId, userData)
    
    try {
        const userProfileData = {
            email: userData.email,
            userName: userData.userName,
            birthDate: userData.birthDate,
            role: userData.role || 'user',
            createdAt: new Date(),
            lastLoginAt: new Date(),
            userId: userId
        }
        
        await setDoc(doc(db, 'users', userId), userProfileData)
        console.log('✅ User profile created successfully!')
        return true
        
    } catch (error) {
        console.error('❌ Error creating user profile:', error)
        throw error
    }
}

const updateLastLogin = async (userId) => {
    try {
        await setDoc(doc(db, 'users', userId), {
            lastLoginAt: new Date()
        }, { merge: true })
        
        console.log('✅ Last login updated for user:', userId)
        
    } catch (error) {
        console.error('❌ Error updating last login:', error)
    }
}

const login = async (email, password) => {
    console.log('login attempt: ', email);
    loading.value = true
    authError.value= null

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        
        // ✅ Update last login time
        await updateLastLogin(user.uid)
        
        console.log('✅ Login successful:', user.uid)
        
    } catch (err) {
        authError.value = err.message
        console.error('❌ Login error:', err)
    } finally {
        loading.value = false
    }
    
}

const register = async (email, password, additionalData = {}) => { // ✅ Accept additional data
    console.log('register attempt: ', email);
    loading.value = true
    authError.value = null
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        
        // ✅ Create user profile in Firestore
        await createUserProfile(user.uid, {
            email: email,
            userName: additionalData.userName,
            birthDate: additionalData.birthDate,
            role: additionalData.role || 'user'
        })
        
        console.log('✅ Registration completed successfully!')
        
    } catch (err) {
        authError.value = err.message
        console.error('❌ Registration error:', err)
    } finally {
        loading.value = false
    }
}



const logout = async(routerInstance) => {
    console.log('logout of this email: ', currentUser.value?.email); 
    loading.value = true
    authError.value = null

    try {
        await signOut(auth)
        if (routerInstance) {
            routerInstance.push('/')
    }
    }
    catch (err) {
        authError.value = err.message
    }
    finally {
        loading.value = false
    }
}

export function useAuth() {
    return {
        currentUser,
        isLoggedIn,
        authError,
        loading,
        login,
        logout,
        register
    }
}
