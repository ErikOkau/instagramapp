"use client"

import { useState } from "react"
import Login from "../../__components/login"
import Register from "../../__components/register"
import './login.scss'

export default function async() {
    const [login, setLogin] = useState(true)

    return (
        <div className="login">
            {login ? <Login /> : <Register />}
            <div className="login_register">
                <button onClick={() => setLogin(true)}>Log in</button>
                <button onClick={() => setLogin(false)}>Registrer</button>
            </div>
        </div>
    )
}