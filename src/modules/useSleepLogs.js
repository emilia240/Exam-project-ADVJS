import {onMounted, ref} from 'vue'
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";

import { db } from './firebase.js'

export function useSleepLogs() {
    const sleepLogsCollectionRef = 'sleepLogs' //name of the collection in firebase
    const sleepLogs = ref([]); //array to hold the posts from firebase
    const newSleepLogTitle = ref(''); //to hold the newSleepLogTitle
    const showError = ref(false); 

    //NEW
    const editingId = ref(null); // Track which log is being edited
    const editTitle = ref(''); // Hold the edited title

    //NEW
     // Reset error when user starts typing
    const resetError = () => {
        showError.value = false
    }

    //Real time listener to fetch sleep logs from Firestore
    onMounted(() => {
        onSnapshot(collection(db, sleepLogsCollectionRef), (snapshot) => {
            sleepLogs.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        });
    });

    //CREATE a new sleep log
    const addSleepLog = async () => {
    if (newSleepLogTitle.value.trim() === '') {
        showError.value = true;
        return; 
    } 

    try {
        await addDoc(collection(db, sleepLogsCollectionRef), {
        title: newSleepLogTitle.value
        });

        newSleepLogTitle.value = '';
        showError.value = false;
    } catch (error) {
        console.error("Error adding document: ", error);
    }
    };

    //NEW

        // START EDITING a sleep log
        const startEdit = (id, currentTitle) => {
            editingId.value = id;
            editTitle.value = currentTitle;
        };

        // CANCEL EDITING
        const cancelEdit = () => {
            editingId.value = null;
            editTitle.value = '';
        };

        // UPDATE a sleep log
        const updateSleepLog = async (id) => {
            if (editTitle.value.trim() === '') {
                showError.value = true;
                return;
            }

            try {
                await updateDoc(doc(db, sleepLogsCollectionRef, id), {
                    title: editTitle.value
                });

                editingId.value = null;
                editTitle.value = '';
                showError.value = false;
            } catch (error) {
                console.error("Error updating document: ", error);
            }
        };

    //DELETE a sleep log
    const deleteSleepLog = async (id) => {
    try {
        console.log("Delete sleep log with id: ", id);
        await deleteDoc(doc(db, sleepLogsCollectionRef, id));
    }
    catch (error) {
        console.log("Error deleting document: ", error);
    }
    }

    return { sleepLogs, newSleepLogTitle, addSleepLog, deleteSleepLog, showError, resetError, editingId, editTitle, startEdit, cancelEdit, updateSleepLog }

}

