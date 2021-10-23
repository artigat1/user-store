<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-md-5">
                <h3 class="text-center">
                    Add User
                </h3>
                <form @submit.prevent="onFormSubmit">
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
                        <button class="btn btn-primary btn-block">
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="col-md-5">
                {{ message }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'

    import { User } from '@/models/user'
    import { createUser } from '@/api/users.db.ts'


    interface DataModel {
        user: User,
        message?: string,
    }

    export default Vue.extend({
        data: (): DataModel => ({
            user: {
                name: '',
                email: '',
                phone: '',
            },
            message: '',
        }),
        methods: {
            async onFormSubmit(): Promise<void> {
                try {
                    const userId: string = await createUser(this.user)
                    this.message = `User was successfully created with id ${ userId }`
                    this.user = {
                        name: '',
                        email: '',
                        phone: '',
                    }
                } catch (error) {
                    console.error(error)
                    this.message = `An error has occured: ${ error.message }`
                }
            },
        },
    })
</script>
