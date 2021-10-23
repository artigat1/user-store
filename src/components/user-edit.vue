<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <h3 class="text-center">Update User</h3>
            <form @submit.prevent="onUpdateForm">
                <div class="form-group">
                    <label>Name</label>
                    <input v-model="user.name"
                           class="form-control"
                           required
                           type="text">
                </div>

                <div class="form-group">
                    <label>Email</label>
                    <input v-model="user.email"
                           class="form-control"
                           required
                           type="email">
                </div>

                <div class="form-group">
                    <label>Phone</label>
                    <input v-model="user.phone"
                           class="form-control"
                           required
                           type="text">
                </div>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Update User</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    import { User } from '@/models/user'
    import { getUser, updateUser } from "@/api/users.db";

    interface DataModel {
        user: User
    }

    export default Vue.extend({
        name: 'UserEdit',

        data(): DataModel {
            return {
                user: {
                    id: '',
                    name: '',
                    email: '',
                    phone: '',
                },
            }
        },

        created() {
            this.getUser()
        },

        methods: {
            async getUser() {
                this.user.id = this.$route.params.id
                const response = await getUser(this.user.id as string)
                if (response) {
                    this.user = response
                } else {
                    console.error('Unable to find user')
                }
            },


            async onUpdateForm() {
                try {
                    await updateUser(this.user as User)
                    await this.$router.push('/list')
                } catch (error) {
                    console.error(error)
                }
            }
        },
    })
</script>
