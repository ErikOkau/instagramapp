import ImageCarusel from "../../__components/post/images"
import { isServerError, postDateFormater } from "@/app/__assets/utils"
import { PrismaClient } from "@prisma/client"
import "./card.scss"

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
    }).catch(e => 500)
    
    if (isServerError(post)) return (<div>Server error</div>)

    const images = post?.images.map(image => {
        return {
            ...image,
            bytes: image.bytes.toString('base64')
        }
    })

    return (
        <div className="card">
            <div className="top">
                <div>
                    <img src="/usericon.png" />
                    <p>{post?.user.username} - {postDateFormater(post?.createAt!)}</p>
                </div>

                <img src="" alt="" />
            </div>
            <ImageCarusel images={images} ></ImageCarusel>
        </div>
    )
}