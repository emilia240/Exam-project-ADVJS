import { ref, computed, onMounted } from 'vue'
import { collection, onSnapshot, doc, updateDoc, query, orderBy, where } from "firebase/firestore"
import { useAuth } from './useAuth.js'
import { db } from './firebase.js'

export function useUsers() {
    console.log('👥 useUsers composable initialized')

    const { currentUser } = useAuth()
    
    // Collections
    const usersCollectionRef = 'users'
    const sleepLogsCollectionRef = 'sleepLogs'
    
    // State
    const users = ref([])
    const allSleepLogs = ref([])
    const loading = ref(false)
    const error = ref('')
    
    // Check if current user is admin
    const isAdmin = computed(() => {
        if (!currentUser.value) return false
        const currentUserData = users.value.find(user => user.email === currentUser.value.email)
        return currentUserData?.role === 'admin'
    })
    
    // Statistics

    const totalUsers = computed(() => users.value.length)
    const totalSleepLogs = computed(() => allSleepLogs.value.length)
    const recentUsers = computed(() => {
        return users.value
            .sort((a, b) => new Date(b.createdAt?.toDate?.() || b.createdAt) - new Date(a.createdAt?.toDate?.() || a.createdAt))
            .slice(0, 5)
    }) 
    
    // User management functions
    const changeUserRole = async (userId, newRole) => {
        if (!isAdmin.value) {
            error.value = 'Only admins can change user roles'
            return false
        }
        
        console.log(`👥 Changing user ${userId} role to ${newRole}`)
        loading.value = true
        
        try {
            await updateDoc(doc(db, usersCollectionRef, userId), {
                role: newRole,
                updatedAt: new Date()
            })
            
            console.log('✅ User role updated successfully')
            return true
            
        } catch (err) {
            console.error('❌ Error updating user role:', err)
            error.value = 'Failed to update user role'
            return false
        } finally {
            loading.value = false
        }
    }
    
    // Sleep log management (admins can delete any log)
    const deleteSleepLogAsAdmin = async (logId) => {
        if (!isAdmin.value) {
            error.value = 'Only admins can delete sleep logs'
            return false
        }
        
        console.log(`🗑️ Admin deleting sleep log ${logId}`)
        
        try {
            await deleteDoc(doc(db, sleepLogsCollectionRef, logId))
            console.log('✅ Sleep log deleted by admin')
            return true
            
        } catch (err) {
            console.error('❌ Error deleting sleep log:', err)
            error.value = 'Failed to delete sleep log'
            return false
        }
    }
    
    // Format date helper
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Unknown'
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }
    
    // Get user by email
    const getUserByEmail = (email) => {
        return users.value.find(user => user.email === email)
    }
    
    // Reset error
    const resetError = () => {
        error.value = ''
    }
    
    // Set up real-time listeners
    onMounted(() => {
        console.log('👥 Setting up users listener')
        
        // Listen to all users
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
        }, (err) => {
            console.error('❌ Error listening to users:', err)
            error.value = 'Failed to load users'
        })
        
        // Listen to all sleep logs (for admin view)
        const allLogsQuery = query(
            collection(db, sleepLogsCollectionRef),
            orderBy('createdAt', 'desc')
        )
        
        onSnapshot(allLogsQuery, (snapshot) => {
            console.log('📊 All sleep logs snapshot received:', snapshot.docs.length, 'logs')
            allSleepLogs.value = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))
        }, (err) => {
            console.error('❌ Error listening to all sleep logs:', err)
        })
    })
    
    return {
        // Data
        users,
        allSleepLogs,
        
        // Computed
        isAdmin,
        totalUsers,
        totalSleepLogs,
        recentUsers,
        
        // Functions
        changeUserRole,
        deleteSleepLogAsAdmin,
        formatDate,
        getUserByEmail,
        resetError,
        
        // State
        loading,
        error
    }
}