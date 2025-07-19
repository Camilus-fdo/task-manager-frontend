<template>
  <div class="container py-4">
    <LoadingOverlay v-if="loading" />
    <div class="mb-3 d-flex gap-2">
      <select v-model="selectedStatus" class="form-select w-auto" @change="fetchTasks">
        <option value="">All Statuses</option>
        <option v-for="status in statuses" :key="status" :value="status">{{ status }}</option>
      </select>
      <UserSelector :users="users" v-model="selectedUser" placeholder="All Users" class="w-auto" @change="fetchTasks" />
      <button class="btn btn-primary ms-auto" @click="openForm()">Add Task</button>
    </div>
    <div class="row g-3">
      <div class="col-12">
        <div v-for="task in tasks" :key="task.id" class="mb-2">
          <TaskCard :task="task" :users="users" @edit="openForm(task)" @view="openDetails(task)" @assign="assignUser" @complete="markTaskComplete" @delete="deleteTask" />
        </div>
      </div>
    </div>
    <TaskForm v-if="showForm" :task="editingTask" :users="users" :formErrors="formErrors" @close="closeForm" @save="saveTask" />
    <TaskDetails v-if="showDetails" :task="selectedTask" @close="closeDetails" />
  </div>
</template>

<script>
import TaskCard from '../components/TaskCard.vue'
import TaskForm from '../components/TaskForm.vue'
import UserSelector from '../components/UserSelector.vue'
import TaskDetails from '../components/TaskDetails.vue'
import TaskService from '../services/api/TaskService.js'
import UserService from '../services/api/UserService.js'
import LoadingOverlay from '../components/LoadingOverlay.vue'

export default {
  components: { TaskCard, TaskForm, UserSelector, TaskDetails, LoadingOverlay },
  data() {
    return {
      tasks: [],
      users: [],
      statuses: ['pending', 'completed'],
      selectedStatus: '',
      selectedUser: '',
      showForm: false,
      editingTask: null,
      showDetails: false,
      selectedTask: null,
      loading: false,
      error: '',
      formErrors: {}
    }
  },
  mounted() {
    this.fetchUsers()
    this.fetchTasks()
  },
  methods: {
    async fetchUsers() {
      this.loading = true
      try {
        const response = await UserService.getUsers()
        if (response.data && response.data.success) {
          this.users = response.data.data
        } else {
          this.error = response.data.message || 'Failed to fetch users.'
        }
      } catch (e) {
        this.error = e.message || 'Failed to fetch users.'
      } finally {
        this.loading = false
      }
    },
    async fetchTasks() {
      this.loading = true
      this.error = ''
      try {
        const params = {
          status: this.selectedStatus,
          assigned_user_id: this.selectedUser
        }
        const response = await TaskService.getTasks(params)
        if (response.data && response.data.success) {
          this.tasks = response.data.data.data || response.data.data
        } else {
          this.error = response.data.message || 'Failed to fetch tasks.'
        }
      } catch (e) {
        this.error = e.message || 'Failed to fetch tasks.'
      } finally {
        this.loading = false
      }
    },
    openForm(task) {
      this.editingTask = task ? { ...task } : null
      this.showForm = true
      this.formErrors = {}
    },
    closeForm() {
      this.showForm = false
      this.editingTask = null
      this.formErrors = {}
    },
    async saveTask(task) {
      this.loading = true;
      try {
        let response;
        if (task.id) {
          response = await TaskService.updateTask(task.id, task);
          const idx = this.tasks.findIndex(t => t.id === task.id);
          if (idx !== -1) {
            this.$set(this.tasks, idx, response.data.data);
          }
        } else {
          response = await TaskService.createTask(task);
          this.tasks.push(response.data.data);
        }
        this.closeForm();
      } catch (e) {
        if (e.response && e.response.status === 422 && e.response.data && e.response.data.errors) {
          this.formErrors = e.response.data.errors;
        } else {
          this.error = e.message || 'Failed to save task.';
        }
      } finally {
        this.loading = false;
      }
    },
    openDetails(task) {
      this.selectedTask = task
      this.showDetails = true
    },
    closeDetails() {
      this.showDetails = false
      this.selectedTask = null
    },
    async assignUser(task, userId) {
      this.loading = true
      try {
        const updatedTask = { ...task, assigned_user_id: userId }
        const response = await TaskService.updateTask(task.id, updatedTask)
        if (response.data && response.data.success) {
          const idx = this.tasks.findIndex(t => t.id === task.id)
          if (idx !== -1) {
            this.$set(this.tasks, idx, response.data.data)
          }
        }
      } catch (e) {
        this.error = e.message || 'Failed to assign user.'
      } finally {
        this.loading = false
      }
    },
    async markTaskComplete(task) {
      this.loading = true
      try {
        const updatedTask = { ...task, status: 'completed' }
        const response = await TaskService.updateTask(task.id, updatedTask)
        if (response.data && response.data.success) {
          const idx = this.tasks.findIndex(t => t.id === task.id)
          if (idx !== -1) {
            this.$set(this.tasks, idx, response.data.data)
          }
        }
      } catch (e) {
        this.error = e.message || 'Failed to mark task as complete.'
      } finally {
        this.loading = false
      }
    },
    async deleteTask(task) {
      if (!window.confirm('Are you sure you want to delete this task?')) return;
      this.loading = true
      try {
        const response = await TaskService.deleteTask(task.id)
        if (response.data && response.data.success) {
          this.tasks = this.tasks.filter(t => t.id !== task.id)
        } else {
          this.error = response.data.message || 'Failed to delete task.'
        }
      } catch (e) {
        this.error = e.message || 'Failed to delete task.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
</style> 