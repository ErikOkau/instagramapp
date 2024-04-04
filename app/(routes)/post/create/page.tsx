"use client"

import { createPost } from "@/app/__actions/postActions"
import SubmitButton from "@/app/__components/submitButton"
import "./create.scss"

export default function () {
  return (
    <form
      action={async (formData) => {
        const response = await createPost(formData)
        console.log(response)
      }}
    >
      <div className="leftCreate">
        <h1>Opprett nytt innlegg</h1>
        <img src="/upload_create.svg" />
        <p>Dra bilder eller videoer her</p>
        <input
          type="file"
          name="images"
          required
          multiple
          accept="image/png, image/gif, image/jpeg"
        />
      </div>

      <div className="lineBetween"></div>

      <div className="rightCreate">
        <textarea name="content" placeholder="Skriv en undertekst ..." required />
        <SubmitButton text="Publiser" pendingText="Creating..." />
      </div>
    </form>
  )
}
