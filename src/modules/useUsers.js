import { ref, computed } from 'vue'
import { collection, onSnapshot, doc, setDoc, query, orderBy } from "firebase/firestore"
import { db } from './firebase.js'

export function useUsers() {
    console.log('👥 useUsers composable initialized')

    
    // Collections
    const usersCollectionRef = 'users'
    const sleepLogsCollectionRef = 'sleepLogs'
    
    // State
    const users = ref([])
    const allSleepLogs = ref([])
    const loading = ref(false)
    const error = ref('')

    // CREATE - Add new user profile to Firestore
    const createUserProfile = async (userId, userData) => {
        console.log('👥 Creating user profile for:', userId, userData)
        
        try {
            const userProfileData = {
                email: userData.email,
                userName: userData.userName,
                birthDate: userData.birthDate,
                role: userData.role,
                createdAt: new Date(),
                lastLoginAt: new Date(),
                userId: userId // Store the Firebase Auth UID
            }
            
            // Use setDoc with specific document ID (same as Auth UID)
            await setDoc(doc(db, usersCollectionRef, userId), userProfileData)
            
            console.log('✅ User profile created successfully!')
            return true
            
        } catch (error) {
            console.error('❌ Error creating user profile:', error)
            throw error
        }
    }

    // UPDATE - Update user's last login time
    const updateLastLogin = async (userId) => {
        try {
            await setDoc(doc(db, usersCollectionRef, userId), {
                lastLoginAt: new Date()
            }, { merge: true }) // merge: true preserves existing data
            
            console.log('✅ Last login updated for user:', userId)
            
        } catch (error) {
            console.error('❌ Error updating last login:', error)
        }
    }

    // Get all users (for admin dashboard) 
    const loadAllUsers = () => {
        console.log('👥 Setting up users real-time listener')
        
        const usersQuery = query(
            collection(db, usersCollectionRef),
            orderBy('createdAt', 'desc')
        )

        onSnapshot(usersQuery, (snapshot) => {
            console.log('👥 Users snapshot received:', snapshot.docs.length, 'users')
            users.value = snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data() 
            }))
            console.log('📊 Users updated:', users.value)
        }, (error) => {
            console.error('❌ Error listening to users updates:', error)
        })
    }

    // Get all sleep logs (for admin dashboard)
    const loadAllSleepLogs = () => {
        console.log('🛏️ Setting up all sleep logs real-time listener')
        
        const sleepLogsQuery = query(
            collection(db, sleepLogsCollectionRef),
            orderBy('createdAt', 'desc')
        )

        onSnapshot(sleepLogsQuery, (snapshot) => {
            console.log('🛏️ All sleep logs snapshot received:', snapshot.docs.length, 'logs')
            allSleepLogs.value = snapshot.docs.map(doc => ({ 
                id: doc.id, 
                ...doc.data() 
            }))
            console.log('📊 All sleep logs updated:', allSleepLogs.value)
        }, (error) => {
            console.error('❌ Error listening to all sleep logs updates:', error)
        })
    }

    // Computed statistics
    const totalUsers = computed(() => {
        return users.value?.length || 0
    })

    const totalSleepLogs = computed(() => {
        return allSleepLogs.value?.length || 0
    })

    const recentUsers = computed(() => {
        return users.value?.slice(0, 5) || []
    })

    // Initialize data loading for admin
    const initializeAdminData = () => {
        loadAllUsers()
        loadAllSleepLogs()
    }

    return {
        // State
        users,
        allSleepLogs,
        loading,
        error,
        
        // Computed
        totalUsers,
        totalSleepLogs,
        recentUsers,
        
        // Methods
        createUserProfile,
        updateLastLogin,
        initializeAdminData
    }
}