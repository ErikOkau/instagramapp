"use client"

import { likePost } from "@/app/__actions/postActions"
import { Like } from "@prisma/client"
import { useState } from "react"


export default function ({postId, likedCheck}: {postId?: number, likedCheck: Like | null | {error: string}}) {
    if(!postId) return (<div></div>)
    const [liked, setLiked] = useState(likedCheck?.hasOwnProperty("id") ? true : false)
    return (
        <div className="iconsButtons">
            <div>
                <img src="/unselected_icon/heart.svg" data-liked={liked} onClick={async () => {
                    const likeRes = await likePost(postId)
                    if(likeRes.error) return
                    setLiked(!liked)
                }} />
                <img src="/unselected_icon/share.svg" alt="" />
            </div>
            <img src="/unselected_icon/bookmark.svg" alt="" />
        </div>  
    )
}