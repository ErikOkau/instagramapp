"use client"

import { useState } from "react"
import Login from "../../__components/login"
import Register from "../../__components/register"

export default function async () {
    const [login, setLogin] = useState(true)

    return (
        <div>
            {login ? <Login /> : <Register />}
            <button onClick={() => setLogin(true)}>Login</button>
            <button onClick={() => setLogin(false)}>Register</button>
        </div>
    )
}