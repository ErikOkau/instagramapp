import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default function ({id}:{id: number}) {
    const post = prisma.post.findUnique({
        where: {
            id
        },
        include: {
            user: true,
        }
    }) 
    console.log(post)
    return (
        <div>
{/*             <h1>{post.user.username}</h1>
            <h1>{post.comment}</h1>
 */}        </div>
    )
}