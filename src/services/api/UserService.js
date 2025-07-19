import BaseAPI from './BaseAPI'

class UserService extends BaseAPI {
  getUsers() {
    return this.get(['/users'])
  }
}

export default new UserService() 