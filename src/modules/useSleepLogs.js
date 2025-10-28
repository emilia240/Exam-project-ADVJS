import {onMounted, ref, computed} from 'vue'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, where, orderBy } from "firebase/firestore";
import { useAuth } from './useAuth.js'
import { useRouter } from 'vue-router'


import { db } from './firebase.js'

export function useSleepLogs() {
    console.log('🚀 useSleepLogs composable initialized')

    const router = useRouter()
    const { currentUser } = useAuth(); // Get the current user from useAuth
    console.log('👤 Current user from useAuth:', currentUser.value)

    const sleepLogsCollectionRef = 'sleepLogs' //name of the collection in firebase
    const sleepLogs = ref([]); //array to hold the posts from firebase
    const showError = ref(false); 

    // Form state variables
    // used for the sleep log form
    const isOpen = ref(false)
    const bedTime = ref('')
    const wakeTime = ref('')
    const sleepQuality = ref(5)
    const dreamJournal = ref('')
    const tags = ref('')
    
    // Loading and error states
    const saving = ref(false) // indicates if a save operation is in progress
    const errorMessage = ref('') // holds error messages for display



    // Helper function to calculate sleep hours
    const calculateSleepHours = (bedTime, wakeTime) => {
        if (!bedTime || !wakeTime) return null
        
        console.log('🛏️ Calculating sleep hours from', bedTime, 'to', wakeTime)
        const bed = new Date(`2024-01-01 ${bedTime}`)
        const wake = new Date(`2024-01-01 ${wakeTime}`)
        
        // Handle overnight sleep
        if (wake < bed) {
            wake.setDate(wake.getDate() + 1)
        }
        
        const diffMs = wake - bed
        const hours = (diffMs / (1000 * 60 * 60)) // Return as number, not string
        console.log('✅ Calculated sleep hours:', hours)
        return hours
    }


    // Computed - Total Sleep Time (function to calculate total sleep time based on bedTime and wakeTime)
    const totalSleepTime = computed(() => {
        const hours = calculateSleepHours(bedTime.value, wakeTime.value)
        console.log('🕒 totalSleepTime computed:', hours)
        return hours ? `${hours.toFixed(1)} hours` : '- hours'
    })

    // Reset error function
    //needed to clear error messages
    const resetError = () => {
        console.log('🔄 resetError called - clearing errors')

        showError.value = false
        errorMessage.value = ''
        console.log('✅ Errors reset successfully')
    }


    // Form validation
    // function to validate the sleep log form inputs for when users forget to fill something out
    const validateForm = () => {
        console.log('🔍 validateForm called')
        console.log('🔍 Form data:', { 
            bedTime: bedTime.value, 
            wakeTime: wakeTime.value, 
            dreamJournal: dreamJournal.value,
            currentUser: !!currentUser.value 
        })

        if (!bedTime.value) {
            console.log('❌ Validation failed: No bedtime')

            errorMessage.value = 'Please enter a bedtime'
            showError.value = true
        return false
        }
        
        if (!wakeTime.value) {
            console.log('❌ Validation failed: No wake time')
            
            errorMessage.value = 'Please enter a wake time'
            showError.value = true
        return false
        }
        
        if (!dreamJournal.value.trim()) {
            console.log('❌ Validation failed: No dream journal entry')
            
            errorMessage.value = 'Please enter a dream entry'
            showError.value = true
        return false
        }
        
        if (!currentUser.value) {
            console.log('❌ Validation failed: No user logged in')

            errorMessage.value = 'You must be logged in to save sleep logs'
            showError.value = true
        return false
        }
        
        console.log('✅ Form validation passed')
        resetError()
        return true
    }

    // Form methods
    // functions to open and close the sleep log form modal
    const openForm = () => {
        console.log('📝 openForm called')

        isOpen.value = true
        resetError()
        console.log('✅ Form opened successfully')
    }

    const closeForm = () => {
        console.log('❌ closeForm called')

        isOpen.value = false
        resetForm()
        console.log('✅ Form closed and reset successfully')
    }

    const handleOverlayClick = (event) => {
        console.log('🖱️ handleOverlayClick called')

        if (event.target === event.currentTarget) {
            console.log('✅ Overlay clicked, closing form')

            closeForm()
        } else {
            console.log('❌ Click was inside form, not closing')
        }
    }

    const resetForm = () => {
        console.log('🔄 resetForm called')

        bedTime.value = ''
        wakeTime.value = ''
        sleepQuality.value = 5
        dreamJournal.value = ''
        tags.value = ''
        resetError()
        console.log('✅ Form reset successfully')
    }

    //CREATE
    // Save sleep log to Firestore (main form logic)
    const saveSleepLog = async () => {
        console.log('💾 saveSleepLog called')
        if (!validateForm()) {
            console.log('❌ saveSleepLog aborted: validation failed')
            return
        }

        console.log('💾 Starting save process...')

        saving.value = true
        
        try {
            console.log('💾 Preparing sleep log data for Firestore...')
            const hoursSlept = calculateSleepHours(bedTime.value, wakeTime.value)

            // Prepare data matching your Firestore schema
            const sleepLogData = {
                bedTime: bedTime.value,
                wakeTime: wakeTime.value,
                hoursSlept: parseFloat(hoursSlept.toFixed(1)),
                date: new Date().toISOString().split('T')[0],
                sleepQuality: parseInt(sleepQuality.value),
                dreamJournal: dreamJournal.value.trim(),
                tags: tags.value.trim(),
                userId: currentUser.value.uid,
                userEmail: currentUser.value.email,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            console.log('💾 Prepared sleep log data:', sleepLogData)

            await addDoc(collection(db, sleepLogsCollectionRef), sleepLogData)
            
            console.log('✅ Sleep log saved successfully to Firestore!')
            closeForm()
        
        } 
        catch (error) {
            console.error('❌ Error saving sleep log:', error)
            errorMessage.value = 'Failed to save sleep log. Please try again.'
            showError.value = true
        } 
        finally {
            saving.value = false
            console.log('💾 Save process completed, saving flag reset')
        }
    }


    //UPDATE
    // Update existing sleep log (for SleepLogDetailView)
    const saveSleepLogChanges = async (logId, editData) => {
        if (!logId) {
            console.log('❌ saveSleepLogChanges aborted: no log ID provided')
            return false
        }
        
        console.log('💾 Saving sleep log changes for ID:', logId)
        saving.value = true
        resetError()
        
        try {
            // Calculate hours slept
            const hoursSlept = calculateSleepHours(editData.bedTime, editData.wakeTime)
            
            const updateData = {
                bedTime: editData.bedTime,
                wakeTime: editData.wakeTime,
                hoursSlept: parseFloat(hoursSlept.toFixed(1)),
                sleepQuality: parseInt(editData.sleepQuality),
                dreamJournal: editData.dreamJournal.trim(),
                tags: editData.tags.trim(),
                updatedAt: new Date()
            }
            
            await updateDoc(doc(db, sleepLogsCollectionRef, logId), updateData)
            
            console.log('✅ Sleep log updated successfully!')
            return true
            
        } catch (error) {
            console.error('❌ Error updating sleep log:', error)
            errorMessage.value = 'Failed to save changes. Please try again.'
            showError.value = true
            return false
        } finally {
            saving.value = false
        }
    }

    //DELETE
    // Delete sleep log (for SleepLogDetailView)
    const deleteSleepLog = async (logId) => {
        if (!logId) {
            console.log('❌ deleteSleepLog aborted: no log ID provided')
            return false
        }
        
        console.log('🗑️ Deleting sleep log with ID:', logId)
        
        try {
            await deleteDoc(doc(db, sleepLogsCollectionRef, logId))
            console.log('✅ Sleep log deleted successfully!')
            
            // Navigate back to sleep logs list
            router.push('/sleep-logs')
            return true
            
        } catch (error) {
            console.error('❌ Error deleting sleep log:', error)
            errorMessage.value = 'Failed to delete sleep log. Please try again.'
            showError.value = true
            return false
        }
    }


    // REAL-TIME LISTENER - fetch only current user's sleep logs
    onMounted(() => {
        console.log('🔄 onMounted called')
        console.log('👤 Current user in onMounted:', currentUser.value)


        if (currentUser.value) {
            console.log('🔥 Setting up Firestore real-time listener for user:', currentUser.value.uid)
            const userSleepLogsQuery = query( // Create a query to fetch only the current user's sleep logs
                collection(db, sleepLogsCollectionRef), // what collection to search
                where('userId', '==', currentUser.value.uid), // filter by current user's ID
                orderBy('createdAt', 'desc') // order by creation date descending
        )

        onSnapshot(userSleepLogsQuery, (snapshot) => {
            console.log('🔥 Firestore snapshot received:', snapshot.docs.length, 'documents')
            sleepLogs.value = snapshot.docs.map(doc => ({ 
            id: doc.id, 
            ...doc.data() 
            }))
            console.log('📊 Sleep logs updated:', sleepLogs.value)
        }, (error) => {
            console.error('❌ Error listening to Firestore updates:', error)
        })
        } 
        
        else {
            console.log('❌ No current user logged in, skipping Firestore listener setup')
        }
    })

   
  return { 
    // Sleep logs data
    sleepLogs, 
    
    // Form state
    isOpen,
    bedTime,
    wakeTime,
    sleepQuality,
    dreamJournal,
    tags,
    
    // Computed values
    totalSleepTime,
    
    // Error handling
    showError, 
    errorMessage,
    resetError,
    
    //Calculation helper
    calculateSleepHours,

    // Form actions
    openForm,
    closeForm,
    handleOverlayClick,
    
    
    // CRUD operations for detail view
    saveSleepLog,
    saveSleepLogChanges,
    deleteSleepLog,


    // Loading state
    saving,
    
  }

}

