import BaseAPI from './BaseAPI'

class TaskService extends BaseAPI {
  getTasks({ status = '', assigned_user_id = '', per_page = 10, page = 1 } = {}) {
    const params = {}
    if (status) params.status = status
    if (assigned_user_id) params.assigned_user_id = assigned_user_id
    params.per_page = per_page
    params.page = page
    return this.get(['/tasks'], params)
  }

  createTask(task) {
    return this.post(task, ['/tasks'])
  }

  updateTask(taskId, task) {
    return this.put(task, ['/tasks', taskId])
  }

  deleteTask(taskId) {
    return this.delete(['/tasks', taskId])
  }
}

export default new TaskService() 