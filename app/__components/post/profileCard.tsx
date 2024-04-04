import ImageCarusel from "./images"
import CommentInput from "./commentInput"
import Comments from "./comments"
import IconsButtons from "./iconsButtons"
import { postDateFormater } from "@/app/__assets/utils"
import type { Post, Image, Comment, User } from "@prisma/client"
import "./card.scss"
import { checkIfLiked } from "@/app/__actions/postActions"

type CardComment = Comment & { user: User }

type CardPost = Post & {
    user: User
    images: Image[]
    comments: CardComment[]
    _count: {
        comments: number
        likes: number
    }
}


export default async function ({post}:{post: CardPost}) {
    const images = post?.images.map(image => {
        return {
            ...image,
            bytes: image.bytes.toString('base64')
        }
    })

    const likeCheck = await checkIfLiked(post.id)
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