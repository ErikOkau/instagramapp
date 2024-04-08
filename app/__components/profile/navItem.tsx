"use client"
import "./navItem.scss"
import { useState } from "react"

export default function ({
  username,
  posts,
  comments,
  likedPosts,
}: {
  username: string
  posts: number
  comments: number
  likedPosts: number
}) {
  const [counter, setCounter] = useState(posts)
  const [counterLabel, setLabel] = useState("innlegg")

  return (
    <div className="profile_nav_Content">
      <div className="profile_nav_item">
        <h1>{username + " " + "-"}</h1>
        <p>
          {counter} {counterLabel}
        </p>
      </div>
      <hr /> {/* skille linje */}
      <div className="pages">
        <div
          onClick={() => {
            setCounter(posts)
            setLabel("innlegg")
          }}
        >
          <img src="" alt="tabel" />
          <p>Innlegg</p>
        </div>
        <div
          onClick={() => {
            setCounter(comments)
            setLabel("kommentarer")
          }}
        >
          <img src="" alt="comments" />
          <p>Kommentarer</p>
        </div>
        <div
          onClick={() => {
            setCounter(likedPosts)
            setLabel("liker")
          }}
        >
          <img src="" alt="Liked posts" />
          <p>Likte innlegg</p>
        </div>
      </div>
    </div>
  )
}
