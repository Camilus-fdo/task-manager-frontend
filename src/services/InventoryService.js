import axios from "axios"

class InventoryService {

    constructor () {
        this.api = axios.create({
            baseURL: process.env.VUE_APP_API_BASE_URL
        })
    }

    getAll() {
        return this.api.get(`/inventories`);
    }

    get(id) {
        return this.api.get(`/inventories/${id}`);
    }

    post(payload) {
        return this.api.post(`/inventories`, payload);
    }

    update(payload) {
        return this.api.put(`/inventories`, payload);
    }

    delete(id) {
        return this.api.delete(`/inventories/${id}`);
    }

}

export default new InventoryService()