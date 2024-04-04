"use server"
import { Image, Post, PrismaClient, User } from "@prisma/client"
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

export async function addComment(formData: FormData) {
    const session = cookies().get("session")?.value
    if (!session) return { error: "Not logged in" }

    const parsed = await decrypt(session)
    const comment = formData.get("comment")
    const postId = formData.get("postId")

    if (!comment || !postId) return { error: "Invalid comment" }

    const response = await prisma.comment.create({
        data: {
            text: comment as string,
            user: {
                connect: {
                    id: parsed.id as number
                }
            },
            post: {
                connect: {
                    id: Number(postId)
                }
            }
        }
    }).catch(() => {
        return 500
    })

    if(isServerError(response)) return { error: "Error creating comment" }

    return { id: response.id }
}

export async function likePost(postId: number) {
    const session = cookies().get("session")?.value
    if (!session) return { error: "Not logged in" }
    
    const parsed = await decrypt(session)
    
    const alreadyLiked = await prisma.like.findFirst({
        where: {
            postId,
            userId: parsed.id as number
        }
    })

    if(alreadyLiked) {
        await prisma.like.delete({
            where: {
                id: alreadyLiked.id
            }
        })

        
        return { likedState: false }
    }

    const response = await prisma.like.create({
        data: {
            user: {
                connect: {
                    id: parsed.id as number
                }
            },
            post: {
                connect: {
                    id: postId
                }
            }
        }
    }).catch(() => {
        return 500
    })

    if(isServerError(response)) return { error: "Error liking post" }

    return { id: response.id, likedState: true }
}

export async function checkIfLiked(postId: number) {
    const session = cookies().get("session")?.value
    if (!session) return { error: "Not logged in" }

    const parsed = await decrypt(session)

    const response = await prisma.like.findFirst({
        where: {
            postId,
            userId: parsed.id as number
        }
    }).catch(() => {
        return 500
    })

    if(isServerError(response)) return { error: "Error checking if liked" }

    return response
}