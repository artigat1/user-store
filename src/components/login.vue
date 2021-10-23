<template>
    <div class="row justify-content-center">
        <div class="col-md-5">
            <form @submit.prevent="userLogin">
                <h3>Sign In</h3>

                <div class="form-group">
                    <label>Email address</label>
                    <input v-model="form.email"
                           class="form-control form-control-lg"
                           type="email" />
                </div>

                <div class="form-group">
                    <label>Password</label>
                    <input v-model="form.password"
                           class="form-control form-control-lg"
                           type="password" />
                </div>

                <button class="btn btn-dark btn-lg btn-block"
                        type="submit">Sign In
                </button>

                <p class="forgot-password text-right mt-2 mb-4">
                    <router-link to="/forgot-password">Forgot password ?</router-link>
                </p>
            </form>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapGetters } from 'vuex'

    import { login } from '@/api/login.auth'
    import { GET_IS_AUTHENTICATED } from '@/store/getters'

    interface DataModel {
        form: {
            email: string,
            password: string,
        },
        errorMessage?: string,
    }

    export default Vue.extend({
        name: 'Login',

        data: (): DataModel => ({
            form: {
                email: '',
                password: '',
            },
            errorMessage: '',
        }),

        computed: {
            ...mapGetters({
                isAuthenticated: GET_IS_AUTHENTICATED,
            }),
        },

        watch: {
            isAuthenticated(newVal) {
                // If already logged in, then redirect to the user list page
                if (newVal) {
                    this.$router.push('/list')
                }
            }
        },

        methods: {
            async userLogin() {
                try {
                    await login(this.form.email, this.form.password)
                } catch (error) {
                    console.error(error)
                    this.errorMessage = `${ error.code }: ${ error.message }`
                }
            }
        },
    })
</script>