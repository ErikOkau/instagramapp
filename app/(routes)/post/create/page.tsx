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
        <div className="inputImage">
          <img src="/upload_create.svg" />
          <input
            className="hide_imageFile"
            type="file"
            name="images"
            required
            multiple
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
        <p>Dra bilder eller videoer her</p>
        <div className="inputBox">
          <p>Velg fra enheten din</p>
          <input
            className="hide_file"
            type="file"
            name="images"
            required
            multiple
            accept="image/png, image/gif, image/jpeg"
          />
        </div>
      </div>

      <div className="lineBetween"></div>

      <div className="rightCreate">
        <textarea
          name="content"
          placeholder="Skriv en undertekst ..."
          required
        />
        <SubmitButton text="Publiser" pendingText="Creating..." />
      </div>
    </form>
  )
}
