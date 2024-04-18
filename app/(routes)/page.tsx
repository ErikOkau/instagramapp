import { PrismaClient } from "@prisma/client"
import ProfileCard from "../__components/post/profileCard"

const prisma = new PrismaClient()

export default async function () {
  const posts = await prisma.post.findMany({
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
  })

  return (
    <div>
      {posts.map((post: any) => {
        return <ProfileCard post={post} />
      })}
    </div>
  )
}
