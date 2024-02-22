"use client"

import { useFormStatus } from "react-dom"
import { register } from "../__actions/authActions"
import SubmitButton from "./submitButton"

export default function () {
    return (
        <form action={async formdata => {
            await register(formdata)
        }}>
            <input type="text" name="username" placeholder="Name" required />
            <input type="text" name="mail" placeholder="Email" required />
            <input type="text" name="phone" placeholder="Phone number" />
            <input type="password" name="password" placeholder="Password" required />
            
            <SubmitButton
                text="Create"
                pendingText="Registering..."
            />
        </form>
    )
}