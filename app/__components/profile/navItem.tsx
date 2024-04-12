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
          className="onclick_innlegg"
          onClick={() => {
            setCounter(posts)
            setLabel("innlegg")
          }}
        >
      
            <span>
              <img src="/unselected_icon/Posts.svg" />
              <p>Innlegg</p>
            </span>
     
        </div>
        <div
          className="onclick_kommentarer"
          onClick={() => {
            setCounter(comments)
            setLabel("kommentarer")
          }}
        >
         
            <span>
              <img src="/Comment.svg" />
              <p>Kommentarer</p>
            </span>
       
        </div>
        <div
          className="onclick_likedPosts"
          onClick={() => {
            setCounter(likedPosts)
            setLabel("liker")
          }}
        >
          
            <span>
              <img src="/unselected_icon/heart.svg" />
              <p>Likte innlegg</p>
            </span>
         
        </div>
      </div>
    </div>
  )
}
