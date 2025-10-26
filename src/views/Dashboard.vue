<template>

  <div class="min-h-screen" style="background-color: var(--color-background);">
    <DashboardNav navType="dashboard" @viewAll="goToLogsList" @newLog="openSleepForm" />
    <SleepLogForm ref="sleepFormRef" />
    <div class="content  !pt-20 !md:pt-24 !px-4 !md:px-6">
        <h1 class="px-4 md:px-6">Sleep log tracker</h1>

      <input type="text" v-model="newSleepLogTitle" placeholder="Sleep Log Title" @input="resetError"/>
      <button @click="addSleepLog">Add log</button>
      <span v-if="showError" class="error-message">Have to enter a log title</span>

      <ul>
        <li v-for="log in sleepLogs" :key="log.id">
          <!-- Show edit input when editing this log -->
          <div v-if="editingId === log.id">
            <input 
              type="text" 
              v-model="editTitle" 
              @input="resetError"
              placeholder="Edit title"
            />
            <button @click="updateSleepLog(log.id)">Save</button>
            <button @click="cancelEdit">Cancel</button>
          </div>
          
          <!-- Show normal view when not editing -->
          <div v-else>
            {{ log.title }}
            <button @click="startEdit(log.id, log.title)">Edit</button>
            <button @click="deleteSleepLog(log.id)">Delete</button>
          </div>
        </li>
      </ul>
    </div>
    

  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useSleepLogs } from '../modules/useSleepLogs.js'
import DashboardNav from '../components/DashboardNav.vue'
import SleepLogForm from '../components/SleepLogForm.vue'

const sleepFormRef = ref(null)

const openSleepForm = () => {
  sleepFormRef.value?.openForm()
}

const { sleepLogs, newSleepLogTitle, addSleepLog, deleteSleepLog, showError, resetError, editingId, editTitle, startEdit, cancelEdit, updateSleepLog } = useSleepLogs()

// Clean up loading overlay when Dashboard mounts
onMounted(() => {
  // Remove the loading overlay created in LoginView
  const loadingOverlay = document.querySelector('.loading-overlay')
  if (loadingOverlay) {
    loadingOverlay.remove()
    console.log('Loading overlay removed')
  }
})
</script>

<style>

.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

li {
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin: 0 5px;
  padding: 5px 10px;
}

input {
  margin-right: 10px;
  padding: 5px;
}

@media (min-width: 1024px) {
/*   .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  } */
}
</style>