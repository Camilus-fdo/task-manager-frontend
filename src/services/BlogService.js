import axios from "axios"

class BlogService {

    constructor () {
        this.api = axios.create({
            baseURL: process.env.VUE_APP_API_BASE_URL
        })
    }

    getAll() {
        return this.api.get(`/blogs`);
    }

    get(id) {
        return this.api.get(`/blogs/${id}`);
    }

    post(payload) {
        return this.api.post(`/blogs`, payload);
    }

    update(payload) {
        return this.api.put(`/blogs`, payload);
    }

    delete(id) {
        return this.api.delete(`/blogs/${id}`);
    }

}

export default new BlogService()