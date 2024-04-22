"use server"

import { PrismaClient } from "@prisma/client"
import { sha256 } from "@/app/__assets/utils"
import { redirect } from "next/navigation"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const prisma = new PrismaClient()
const secret = "secret"
const key = new TextEncoder().encode(secret)

const expires = () => new Date(Date.now() + 1000 * 60 * 60 * 2)

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expires())
    .sign(key)
}

export async function decrypt(token: string) : Promise<any> {
    const { payload } = await jwtVerify(token, key, { 
        algorithms: ["HS256"]
    })
    return payload
}

export async function login(formData: FormData) {
    const mail = formData.get("mail")
    const password = sha256(formData.get("password") as string)

    const user = await prisma.user.findUnique({
        where: {
            mail: mail as string
        }
    })

    if (!user) return { error: "User not found" }
    if (user.password !== password) return { error: "Invalid password" }

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
    const session = await encrypt({ id: user.id, expires })

    cookies().set("session", session, { expires, httpOnly: true})

    redirect("/")
}

export async function register(formData: FormData) {
    const username = formData.get("username")
    const mail = formData.get("mail")
    const phone = formData.get("phone")
    const password = sha256(formData.get("password") as string)

    const user = await prisma.user.create({
        data: {
            username: username as string,
            mail: mail as string,
            phone: Number(phone) || null,
            password: password
        }
    })

    const session = await encrypt({ id: user.id, expires })

    cookies().set("session", session, { expires: expires(), httpOnly: true})

    redirect("/")
}

export async function logout() {
    cookies().set("session", "", { expires: new Date(0)})
    redirect("/login")
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("session")?.value
    if (!session) return

    const parsed = await decrypt(session)
    const res = NextResponse.next()
    
    res.cookies.set({
        name: "session",
        value: await encrypt(parsed),
        httpOnly: true,
        expires: expires()
    })

    return res
}