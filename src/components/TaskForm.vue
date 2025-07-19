<template>
  <div class="modal fade show d-block" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <form @submit.prevent="onSave">
          <div class="modal-header">
            <h5 class="modal-title">{{ task && task.id ? 'Edit Task' : 'Add Task' }}</h5>
            <button type="button" class="btn-close" @click="$emit('close')"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label class="form-label">Title</label>
              <input type="text" class="form-control" v-model="form.title" required maxlength="100" />
              <div v-if="formErrors.title" class="text-danger small">
                {{ formErrors.title[0] }}
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Description</label>
              <textarea class="form-control" v-model="form.description" required maxlength="500" rows="3"></textarea>
              <div v-if="formErrors.description" class="text-danger small">
                {{ formErrors.description[0] }}
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Status</label>
              <select class="form-select" v-model="form.status" required>
                <option value="pending">pending</option>
                <option value="completed">completed</option>
              </select>
              <div v-if="formErrors.status" class="text-danger small">
                {{ formErrors.status[0] }}
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Assigned User</label>
              <UserSelector :users="users" v-model="form.assigned_user_id" />
              <div v-if="formErrors.assigned_user_id" class="text-danger small">
                {{ formErrors.assigned_user_id[0] }}
              </div>
            </div>
            <div class="mb-3">
              <label class="form-label">Due Date</label>
              <input type="date" class="form-control" v-model="form.due_date" required />
              <div v-if="formErrors.due_date" class="text-danger small">
                {{ formErrors.due_date[0] }}
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="$emit('close')">Cancel</button>
            <button type="submit" class="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import UserSelector from './UserSelector.vue'
export default {
  props: {
    task: { type: Object, default: null },
    users: { type: Array, required: true },
    formErrors: { type: Object, default: () => ({}) }
  },
  components: { UserSelector },
  data() {
    return {
      form: {
        title: this.task ? this.task.title : '',
        description: this.task ? this.task.description : '',
        status: this.task ? this.task.status : 'pending',
        assigned_user_id: this.task ? this.task.assigned_user_id : '',
        due_date: this.task ? this.task.due_date : ''
      }
    }
  },
  methods: {
    onSave() {
      const task = this.task ? { ...this.task, ...this.form } : { ...this.form }
      this.$emit('save', task)
    }
  }
}
</script> 