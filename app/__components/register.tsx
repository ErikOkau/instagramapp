"use client"

import { useFormStatus } from "react-dom"
import { register } from "../__actions/authActions"
import SubmitButton from "./submitButton"

export default function () {
    return (
        <form action={async formdata => {
            await register(formdata)
        }}>

            <h1>Velkommen</h1>
            <p>Vennligst fyll inn feltene under og trykk "Opprett bruker" for å lage en bruker.</p>

            <label>Name</label>
            <input type="text" name="username" placeholder="Name" required />
            <label>Email</label>
            <input type="text" name="mail" placeholder="Email" required />
            <label>Phone number</label>
            <input type="text" name="phone" placeholder="Phone number" />
            <label>Password</label>
            <input type="password" name="password" placeholder="Password" required />
            
            <SubmitButton
                text="Opprett bruker"
                pendingText="Registering..."
            />
        </form>
    )
}