"use client"

import { login } from "../__actions/authActions"
import SubmitButton from "./submitButton"

export default function async () {
    return (
        <form action={async formdata => {
            const response = await login(formdata)

            if (response.error) {
                alert(response.error)
            }
        }}>
            <input type="text" name="mail" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <SubmitButton 
                text="Login" 
                pendingText="Logging in..."
            />
        </form>
    )
}