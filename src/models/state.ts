import { AuthenticatedUser } from '@/models/auth-user'

export interface State {
    user?: AuthenticatedUser,
    isAuthenticated: boolean,
}