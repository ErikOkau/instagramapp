"use server"
import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"
import { decrypt } from "./authActions"
import { isServerError } from "../__assets/utils"

const prisma = new PrismaClient()

export async function createPost(formData: FormData) {
    const session = cookies().get("session")?.value
    if (!session) return { error: "Not logged in" }

    const parsed = await decrypt(session)

    const images = formData.getAll("images")
    const content = formData.get("content")

    const post = await prisma.post.create({
        data: {
            comment: content as string,
            imageCount: images.length,

            user: {
                connect: {
                    id: parsed.id as number
                }
            }
        }
    }).catch(() => {
        return 500 
    })

    if(isServerError(post)) return { error: "Error creating post" }

    let error = false
    let uploadedImagesIds: number[] = []


    for (let i = 0;  i < images.length;  i++) {
        const image = await prisma.image.create({
            data: {
                orderNumber: i,
                bytes: Buffer.from(await (images[i] as File).arrayBuffer()),


                post: {
                    connect: {
                        id: post.id
                    }
                }
            }
        }).catch(() => {
            return 500
        })

        if(isServerError(image)) {
            error = true
            break
        }

        uploadedImagesIds.push(image.id)
    }

    if(error) {
        await prisma.post.delete({
            where: {
                id: post.id
            }
        })

        uploadedImagesIds.forEach(async id => {
            await prisma.image.delete({
                where: {
                    id
                }
            })
        })

        return { error: "Error uploading images" }
    }

    return { id: post.id }
}