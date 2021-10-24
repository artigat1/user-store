<template>
    <div>
        <nav class="navbar navbar-dark bg-dark justify-content-between flex-nowrap flex-row">
            <div class="container">
                <a class="navbar-brand float-left">Firebase Vue CRUD Example</a>
                <div v-if="isAuthenticated"
                     class="nav navbar-nav flex-row login-info">
                    {{ authUserEmail }} (last login: {{ lastLoginAt }})
                </div>
                <ul class="nav navbar-nav flex-row float-right gap-2">
                    <li v-if="!isAuthenticated"
                        class="nav-item">
                        <router-link class="nav-link pr-3"
                                     to="/login">Sign In
                        </router-link>
                    </li>
                    <li v-if="isAuthenticated"
                        class="nav-item">
                        <a class="nav-link pr-3"
                           @click.prevent="onLogout">Sign Out
                        </a>
                    </li>
                    <li v-if="isAuthenticated"
                        class="nav-item">
                        <router-link class="nav-link pr-3"
                                     to="/add">Add User
                        </router-link>
                    </li>
                    <li v-if="isAuthenticated"
                        class="nav-item">
                        <router-link class="nav-link"
                                     to="/list">View Users
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>

        <div class="container mt-5">
            <router-view />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import { mapGetters } from 'vuex'
    import { format, utcToZonedTime } from 'date-fns-tz'

    import { GET_IS_AUTHENTICATED, GET_USER } from '@/store/getters'
    import { logout } from '@/api/login.auth'

    export default Vue.extend({
        computed: {
            ...mapGetters({
                isAuthenticated: GET_IS_AUTHENTICATED,
                authenticatedUser: GET_USER,
            }),

            authUserEmail(): string {
                return this.authenticatedUser?.email
            },

            lastLoginAt(): string {
                const lastLoginTimestamp = this.authenticatedUser?.lastLoginAt
                const timestamp = new Date(lastLoginTimestamp.replace(/GMT.*$/, 'GMT+0000')).toISOString()
                const zonedTimestamp = utcToZonedTime(timestamp, 'Europe/London')
                return format(zonedTimestamp, 'yyyy-MM-dd HH:mm')
            }
        },

        methods: {
            async onLogout(): Promise<void> {
                await logout()
                await this.$router.push('/')
            }
        }
    })
</script>

<style lang="scss"
       scoped>
    .login-info {
        color: #fff;
    }
</style>