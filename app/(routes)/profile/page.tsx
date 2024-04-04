import ProfileCard from "@/app/__components/post/profileCard"
import { isServerError } from "../../__assets/utils"
import { decrypt } from "../../__actions/authActions"
import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"

const prisma = new PrismaClient()

export default async function () {
    const token = cookies().get("session")
    const decryptToken = (await decrypt(token?.value as string)) as {
        id: number
        expires: Date
    }

    const user = await prisma.user.findUnique({
        where: {
            id: decryptToken.id
        },

        include: {
            posts: {
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
            },
            comments: true,
            likedPosts: true
        }
    }).catch(e => 500)
    if (isServerError(user)) return (<div>Server error</div>)

    return (<div>
        <h1>{user?.username}</h1>
        <p>{user?.posts.length}</p>
        <hr />  {/* skille linje */}
        <div></div>
        <div>{user?.posts.map((post) => <ProfileCard post={post} />)}</div>
        <div>{user?.comments.map((comment) => )}</div>

    </div>)
}