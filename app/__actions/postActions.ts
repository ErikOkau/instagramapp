"use server"
import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"
import { decrypt } from "./authActions"
import { imageToBase64 } from "../__assets/utils"

const prisma = new PrismaClient()

export async function createPost(formData: FormData) {
    const session = cookies().get("session")?.value
    if (!session) return { error: "Not logged in" }

    const parsed = await decrypt(session)

    const images = formData.getAll("images")
    const content = formData.get("content")

    const post = prisma.post.create({
        data: {
            comment: content as string,
            imageCount: images.length,

            user: {
                connect: {
                    id: parsed.id as number
                }
            },

            images: {
                create: images.map((image, index) => {
                    return {
                        bytes: (image as File).arrayBuffer()
                    }
                })
            }
        }
    })

    return 
}