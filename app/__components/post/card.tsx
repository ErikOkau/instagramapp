import ImageCarusel from "../../__components/post/images"
import CommentInput from "./commentInput"
import Comments from "./comments"
import IconsButtons from "./iconsButtons"
import { isServerError, postDateFormater } from "@/app/__assets/utils"
import { PrismaClient } from "@prisma/client"
import "./card.scss"
import { checkIfLiked } from "@/app/__actions/postActions"

const prisma = new PrismaClient()

export default async function ({id}:{id: number}) {
    const post = await prisma.post.findUnique({
        where: {
            id
        },
        include: {
            user: true,
            images: true,
            comments: {
                orderBy: [
                    {
                        createAt: 'desc'
                    }
                ],
                include: {
                    user: true
                }
            },

            _count: {
                select: {
                    comments: true,
                    likes: true
                }
            }
        }
    }).catch(e => 500)
    
    if (isServerError(post)) return (<div>Server error</div>)

    const images = post?.images.map(image => {
        return {
            ...image,
            bytes: image.bytes.toString('base64')
        }
    })

    const likeCheck = await checkIfLiked(id)
    return (
        <div className="card">
            <div className="top">
                <div>
                    <img src="/usericon.png" />
                    <p>{post?.user.username} - {postDateFormater(post?.createAt!)}</p>
                </div>

            </div>
            <ImageCarusel images={images} ></ImageCarusel>
            <IconsButtons postId={post?.id} likedCheck={likeCheck} />
            <p>{post?._count.likes} likes</p>
            <p>@{post?.user.username} - {post?.comment}</p>
            <Comments comments={post?.comments}/>
            <CommentInput postId={post?.id}/>
        </div>
    )
}