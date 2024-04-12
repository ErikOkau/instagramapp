import ProfileCard from "@/app/__components/post/profileCard"
import { isServerError, postDateFormater } from "../../__assets/utils"
import { decrypt } from "../../__actions/authActions"
import { PrismaClient } from "@prisma/client"
import { cookies } from "next/headers"
import "./profile.scss"
import NavItem from "@/app/__components/profile/navItem"
import Pages from "@/app/__components/profile/pages"

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
    <div className="profile_navigation">
      <NavItem
        username={user?.username!}
        posts={user?.posts.length!}
        comments={user?.comments.length!}
        likedPosts={user?.likedPosts.length!}
      />
      <Pages user={user!} />
    </div>
  )
}
