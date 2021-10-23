<template>
    <div class="row">
        <div class="col-md-12">
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="user in users"
                    :key="user.key">
                    <td>{{ user.name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>
                        <router-link :to="{name: 'edit', params: { id: user.id }}"
                                     class="btn btn-primary">
                            Edit
                        </router-link>
                        <button class="btn btn-danger"
                                @click.prevent="deleteUser(user.id)">
                            Delete
                        </button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    import { User } from '@/models/user'
    import { deleteUser, getUsers } from '@/api/users.db.ts'

    interface DataModel {
        users: User[]
    }

    export default Vue.extend({
        data(): DataModel {
            return {
                users: [],
            }
        },

        created() {
            this.getAllUsers()
        },

        methods: {
            async getAllUsers(): Promise<void> {
                try {
                    this.users = await getUsers()
                }catch(error) {
                    console.error(error)
                }
            },

            async deleteUser(id: any): Promise<void> {
                if (window.confirm("Do you really want to delete?")) {
                    try {
                        await deleteUser(id)
                        this.users = this.users.filter(u => u.id !== id)
                    } catch (error) {
                        console.error(error)
                    }
                }
            },
        },
    })
</script>

<style>
    .btn-primary {
        margin-right: 12px;
    }
</style>
