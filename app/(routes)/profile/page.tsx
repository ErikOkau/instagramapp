import ProfileCard from "@/app/__components/post/profileCard"
import { isServerError, postDateFormater } from "../../__assets/utils"
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

  const user = await prisma.user
    .findUnique({
      where: {
        id: decryptToken.id,
      },

      include: {
        posts: {
          include: {
            user: true,
            images: true,
            comments: {
              orderBy: [
                {
                  createAt: "desc",
                },
              ],
              include: {
                user: true,
              },
            },

            _count: {
              select: {
                comments: true,
                likes: true,
              },
            },
          },
        },
        comments: true,
        likedPosts: {
          include: {
            post: {
              include: {
                user: true,
                images: true,
                comments: {
                  orderBy: [
                    {
                      createAt: "desc",
                    },
                  ],
                  include: {
                    user: true,
                  },
                },

                _count: {
                  select: {
                    comments: true,
                    likes: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    .catch((e) => 500)
  if (isServerError(user)) return <div>Server error</div>

  return (
    <div>
      <h1>{user?.username}</h1>
      <p>{user?.posts.length} innlegg</p>
      <hr /> {/* skille linje */}
      <div></div>
      {/* Posts */}
      <div>
        {user?.posts.length == 0 ? (
          <div>
            <h2>Ingen innlegg</h2>
            <p>Start med å legge til et innlegg</p>
          </div>
        ) : (
          user?.posts.map((post) => <ProfileCard post={post} />)
        )}
      </div>

      {/* Comments */}
      <div>
        {user?.comments.length == 0 ? (
          <div>
            <h2>Ingen kommentarer</h2>
            <p>Så usosial du er, kommenter en plass</p>
          </div>
        ) : (
          user?.comments.reverse().map((comment) => (
            <div>
              <p>
                {user.username} - {postDateFormater(comment.createAt)}
              </p>
              <p>{comment.text}</p>
            </div>
          ))
        )}
      </div>
      
      {/* Liked posts */}
      <div>
        {user?.likedPosts.length == 0 ? (
          <div>
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
