<template>
  <select class="form-select" :value="value" @change="
    $emit('input', $event.target.value ? parseInt($event.target.value) : '');
    $emit('change', $event.target.value ? parseInt($event.target.value) : '');
  ">
    <option :value="''">{{ placeholder || 'Unassigned' }}</option>
    <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
  </select>
</template>

<script>
export default {
  props: {
    users: { type: Array, required: true },
    value: { required: false },
    placeholder: { type: String, default: '' }
  }
}
</script> 