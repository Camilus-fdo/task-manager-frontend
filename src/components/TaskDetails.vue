<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ task.title }}</h5>
          <button type="button" class="btn-close" @click="$emit('close')"></button>
        </div>
        <div class="modal-body">
          <div class="mb-2"><strong>Description:</strong> {{ task.description }}</div>
          <div class="mb-2"><strong>Status:</strong> {{ task.status }}</div>
          <div class="mb-2"><strong>Assigned User:</strong> {{ assignedUserName }}</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('close')">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: { type: Object, required: true }
  },
  computed: {
    assignedUserName() {
      if (!this.task.assigned_user_id) return 'Unassigned'
      if (this.$parent && this.$parent.users) {
        const user = this.$parent.users.find((user) => {
          return user.id === this.task.assigned_user_id
        })
        return user ? user.name : 'Unassigned'
      }
      return this.task.assigned_user_id
    }
  }
}
</script> 