<template>
  <div class="card h-100">
    <div class="card-body d-flex flex-column">
      <div class="mb-2 fw-bold text-truncate title" @click="$emit('view', task)">{{ task.title }}</div>
      <div class="mb-2 text-truncate description" @click="$emit('view', task)">{{ task.description }}</div>
      <div v-if="task.due_date" class="mb-2 text-muted small">Due: {{ task.due_date }}</div>
      <div class="mb-2">
        <span class="badge bg-secondary">{{ task.status }}</span>
      </div>
      <div class="d-flex align-items-center mt-auto">
        <UserSelector :users="users" v-model="assigned" placeholder="Assign user" class="me-1 user-selector-compact" @change="onAssign" />
        <div class="d-flex flex-wrap gap-2">
          <button class="btn btn-sm btn-outline-primary" @click="$emit('edit', task)">Edit</button>
          <button class="btn btn-sm btn-outline-info" @click="$emit('view', task)">Details</button>
          <button v-if="task.status !== 'completed'" class="btn btn-sm btn-success" @click="onMarkComplete">Mark as Complete</button>
          <button class="btn btn-sm btn-outline-danger" @click="onDelete">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserSelector from './UserSelector.vue'
export default {
  props: {
    task: { type: Object, required: true },
    users: { type: Array, required: true }
  },
  components: { UserSelector },
  data() {
    return {
      assigned: this.task.assigned_user_id
    }
  },
  methods: {
    onAssign(val) {
      this.$emit('assign', this.task, val)
    },
    onMarkComplete() {
      this.$emit('complete', this.task)
    },
    onDelete() {
      this.$emit('delete', this.task)
    }
  }
}
</script>

<style scoped>
.description {
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.title {
  font-size: 1.1rem;
  font-weight: bold;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.user-selector-compact {
  min-width: 150px;
  max-width: 180px;
  flex: 0 0 140px;
}
</style> 