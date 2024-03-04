"use client"

import { login } from "../__actions/authActions"
import SubmitButton from "./submitButton"
import './login_register.scss'

export default function async () {
    return (
        <form action={async formdata => {
            const response = await login(formdata)

            if (response.error) {
                alert(response.error)
            }
        }}>
            <h1>Velkommen</h1>
            <p>Vennligst skriv inn brukernavn og passord</p>

            <label>Brukernavn</label>
            <input type="text" name="mail" placeholder="Email" required />

            <label>Passord</label>
            <input type="password" name="password" placeholder="Password" required />

            <SubmitButton 
                text="Login" 
                pendingText="Logging in..."
            />
        </form>
    )
}