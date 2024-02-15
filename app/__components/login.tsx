"use client"

import { useFormStatus } from "react-dom"
import { login } from "../__actions/authActions"

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
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button type="submit">
            {pending ? "Loading..." : "Login"}
        </button>
    )
}
