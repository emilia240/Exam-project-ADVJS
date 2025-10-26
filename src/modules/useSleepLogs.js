import {onMounted, ref, computed} from 'vue'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc, query, where, orderBy } from "firebase/firestore";
import { useAuth } from './useAuth.js'


import { db } from './firebase.js'

export function useSleepLogs() {
    console.log('🚀 useSleepLogs composable initialized')


    const { currentUser } = useAuth(); // Get the current user from useAuth
    console.log('👤 Current user from useAuth:', currentUser.value)

    const sleepLogsCollectionRef = 'sleepLogs' //name of the collection in firebase
    const sleepLogs = ref([]); //array to hold the posts from firebase
    const newSleepLogTitle = ref(''); //to hold the newSleepLogTitle
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

    // Edit functionality
    const editingId = ref(null) // Track which log is being edited
    const editTitle = ref('') // Hold the edited title

    

    // Computed - Total Sleep Time (function to calculate total sleep time based on bedTime and wakeTime)
    const totalSleepTime = computed(() => {
        console.log('⏰ Computing totalSleepTime - bedTime:', bedTime.value, 'wakeTime:', wakeTime.value)
        if (bedTime.value && wakeTime.value) {
        const bed = new Date(`2024-01-01 ${bedTime.value}`)
        const wake = new Date(`2024-01-01 ${wakeTime.value}`)
        
        // Handle overnight sleep
        if (wake < bed) {
            wake.setDate(wake.getDate() + 1)
            console.log('🌙 Detected overnight sleep, adjusted wake time')
        }
        
        const diffMs = wake - bed
        const hours = (diffMs / (1000 * 60 * 60)).toFixed(1)
        console.log('⏰ Calculated sleep hours:', hours)
        return `${hours} hours`
        }
        console.log('⏰ No bedTime or wakeTime provided, returning default')
        return '- hours'
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
            // Calculate hours as number for Firestore
            const bed = new Date(`2024-01-01 ${bedTime.value}`)
            const wake = new Date(`2024-01-01 ${wakeTime.value}`)
            if (wake < bed) wake.setDate(wake.getDate() + 1)
            const hoursSlept = (wake - bed) / (1000 * 60 * 60)
            
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


    //CREATE a new sleep log
    // Legacy methods (for your existing Dashboard)
    const addSleepLog = async () => {
        console.log('➕ addSleepLog (legacy) called with title:', newSleepLogTitle.value)

        if (newSleepLogTitle.value.trim() === '') {
            console.log('❌ addSleepLog failed: empty title')

            showError.value = true
        return
        }

        if (!currentUser.value) {
            console.error('❌ addSleepLog failed: user not logged in')
        return
        }

        try {
        console.log('➕ Adding legacy sleep log to Firestore...')

        await addDoc(collection(db, sleepLogsCollectionRef), {
            title: newSleepLogTitle.value,
            userId: currentUser.value.uid,
            userEmail: currentUser.value.email,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        console.log('✅ Legacy sleep log added successfully')
        newSleepLogTitle.value = ''
        showError.value = false
        } 
        catch (error) {
            console.error('❌ Error adding legacy sleep log:', error)
        }
    }

    

    // START EDITING a sleep log
    const startEdit = (id, currentTitle) => {
        console.log('✏️ startEdit called for id:', id, 'title:', currentTitle)

        editingId.value = id
        editTitle.value = currentTitle
        console.log('✅ Edit mode activated')
    }

    // CANCEL EDITING
    const cancelEdit = () => {
        console.log('🚫 cancelEdit called')

        editingId.value = null
        editTitle.value = ''
        console.log('✅ Edit mode cancelled')
    }

    // UPDATE a sleep log
    const updateSleepLog = async (id) => {
        console.log('💾 updateSleepLog called for id:', id, 'new title:', editTitle.value)


        if (editTitle.value.trim() === '') {
            console.log('❌ Update failed: empty title')
            showError.value = true
        return
        }

        try {
        console.log('💾 Updating sleep log in Firestore...')

        await updateDoc(doc(db, sleepLogsCollectionRef, id), {
            title: editTitle.value,
            updatedAt: new Date()
        })

        console.log('✅ Sleep log updated successfully')
        editingId.value = null
        editTitle.value = ''
        showError.value = false
        } 
        catch (error) {
            console.error('❌ Error updating sleep log:', error)
        }
    }

    //DELETE a sleep log
    const deleteSleepLog = async (id) => {
        console.log('🗑️ deleteSleepLog called for id:', id)

        try {
            console.log('🗑️ Deleting sleep log from Firestore...')
            await deleteDoc(doc(db, sleepLogsCollectionRef, id))
            console.log('✅ Sleep log deleted successfully')
        } 
        catch (error) {
            console.log('❌ Error deleting sleep log:', error)
        }    
   }


  console.log('🎯 useSleepLogs composable setup complete, returning functions')
   
  return { 
    // Sleep logs data
    sleepLogs, 
    newSleepLogTitle, 
    
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
    
    // Form actions
    openForm,
    closeForm,
    handleOverlayClick,
    saveSleepLog,
    
    // Loading state
    saving,
    
    // Legacy CRUD operations
    addSleepLog, 
    deleteSleepLog, 
    editingId, 
    editTitle, 
    startEdit, 
    cancelEdit, 
    updateSleepLog 
  }

}

