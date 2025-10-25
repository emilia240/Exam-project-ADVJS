import { ref, computed } from 'vue';
import { firebaseApp } from './firebase';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, createUserWithEmailAndPassword  } from 'firebase/auth';



const auth = getAuth(firebaseApp);

const currentUser = ref(null);

const isLoggedIn = computed(() => !!currentUser.value) // returns true if currentUser is not null; used for conditional rendering; if the value is null, the user is not logged in


const authError = ref(null);
const loading = ref(false);

onAuthStateChanged(auth, (user) => {
    currentUser.value = user
})

const login = async (email, password) => {
    console.log('login attempt: ', email);
    loading.value = true
    authError.value= null
    try {
        await signInWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
        authError.value = err.message
    }
    finally {
        loading.value = false
    }
    
}

const register = async (email, password) => {
    console.log('register attempt: ', email);
    loading.value = true
    authError.value= null
    try {
        await createUserWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
        authError.value = err.message
    }
    finally {
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
