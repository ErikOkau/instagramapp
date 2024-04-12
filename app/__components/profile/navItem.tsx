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

  const postsElm = document.getElementById("profile_posts")
  const commentsElm = document.getElementById("profile_comments")
  const likedPostsElm = document.getElementById("profile_likedPosts")


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
            postsElm?.style.setProperty("display", "block")
            commentsElm?.style.setProperty("display", "none")
            likedPostsElm?.style.setProperty("display", "none")
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
            postsElm?.style.setProperty("display", "none")
            commentsElm?.style.setProperty("display", "block")
            likedPostsElm?.style.setProperty("display", "none")
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
            postsElm?.style.setProperty("display", "none")
            commentsElm?.style.setProperty("display", "none")
            likedPostsElm?.style.setProperty("display", "block")
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
