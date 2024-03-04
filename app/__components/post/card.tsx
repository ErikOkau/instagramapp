import ImageCarusel from "../../__components/post/images"
import { isServerError } from "@/app/__assets/utils"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function ({id}:{id: number}) {
    const post = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            images: true
        }
    }) 

    const images = post?.images.map(image => {
        return {
            ...image,
            bytes: image.bytes.toString('base64')
        }
    })

    return (
        <div>
{            <ImageCarusel images={images} ></ImageCarusel>
}        </div>
    )
}