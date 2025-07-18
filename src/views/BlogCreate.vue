<template>
    <div>
        <form @submit.prevent="createBlog">
            Post: <input v-model="form.post" required />
            Title: <input v-model="form.title" required />
            Author: <input v-model="form.author" required />
            <button type="submit">Create</button>
        </form>
    </div>
</template>
<script>
import BlogService from '@/services/BlogService';
export default {
    data() {
        return {
            form: {
                post: '',
                title: '',
                author: ''
            }
        }
    },

    methods: {
        createBlog () {
            alert()
            BlogService.post(this.form).then((res) => {
                console.log(res)
            })
        }
    }
}
</script>