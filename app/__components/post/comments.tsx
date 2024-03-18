"use client";

import { useState } from "react";
import { postDateFormater } from "@/app/__assets/utils";
import type { Comment, User } from "@prisma/client";
import './comments.scss'

type CommentProps = Comment & {user: User}

export default function ({comments}: {comments?: CommentProps[]}) {
    if(!comments) return (<div></div>)
    const [showAll, setShowAll] = useState(false)


    return (
        <div>
            {
                showAll ? <p className="lesser hover" onClick={() => setShowAll(!showAll)}>Se mindre - {comments.length}</p> :
                <p className="lesser hover" onClick={() => setShowAll(!showAll)}>Se alle kommentarer - {comments.length}</p>
            }
            {showAll ? comments.map(comment => {
                return (
                    <div key={comment.id}>
                        <p className="weak">{comment.user.username} - {postDateFormater(comment.createAt)}</p>
                        <p className="normal"> {comment.text}</p>
                    </div>
                )
            }) : comments.slice(0, 2).map(comment => {
                return (
                    <div key={comment.id}>
                        <p className="weak">{comment.user.username} - {postDateFormater(comment.createAt)}</p>
                        <p className="normal"> {comment.text}</p>
                    </div>
                )
            })}
        </div>
        
    )
}