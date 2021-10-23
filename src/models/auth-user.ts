export interface AuthenticatedUser {
    email?: string;
    accessToken?: string,
    id?: string,
    lastLoginAt?: number,
}