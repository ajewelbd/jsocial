import CurrentUser from "./CurrentUser";

interface User extends CurrentUser {
    address: string,
    city: string,
    country: string,
    gender: number,
    email_verified_at: string,
    created_at: string,
    updated_at: string
}

export default User;