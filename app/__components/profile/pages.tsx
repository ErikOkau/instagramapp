import { Post, User, Image, Comment } from "@prisma/client"
import ProfileCard from "../post/profileCard"
import { postDateFormater } from "@/app/__assets/utils"

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

type FukkAss = {
    username: string
    comments: Comment[]
    posts: CardPost[]
    likedPosts: {
        post: CardPost
    }[]
}

export default function ({user} : {user: FukkAss}) {
    return (
        <div>
            {/* Posts */}
            <div className="posts">
                {user?.posts.length == 0 ? (
                <div className="postsContent">
                    <h2>Ingen innlegg</h2>
                    <p>Start med å legge til et innlegg</p>
                </div>
                ) : (
                user?.posts.map((post) => <ProfileCard post={post} />)
                )}
            </div>

            {/* Comments */}
            <div className="comments">
                {user?.comments.length == 0 ? (
                <div className="commentsContent">
                    <h2>Ingen kommentarer</h2>
                    <p>Så usosial du er, kommenter en plass</p>
                </div>
                ) : (
                user?.comments.reverse().map((comment) => (
                    <div className="usersComments">
                    <p>
                        {user.username} - {postDateFormater(comment.createAt)}
                    </p>
                    <p>{comment.text}</p>
                    </div>
                ))
                )}
            </div>

            {/* Liked posts */}
            <div className="likedPosts">
                {user?.likedPosts.length == 0 ? (
                <div className="likedPosts_content">
                    <h2>Ingen likte innlegg</h2>
                    <p>Start med å like et innlegg</p>
                </div>
                ) : (
                user?.likedPosts.map((like) => <ProfileCard post={like.post} />)
                )}
            </div>
            
        </div>
    )
}