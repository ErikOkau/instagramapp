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
        <label htmlFor="file_input" className="inputImage">
          <img src="/upload_create.svg" />
        </label>
        <p>Dra bilder eller videoer her</p>
        <div className="inputBox">
          <label htmlFor="file_input">Velg fra enheten din</label>
          <input
            id="file_input"
            className="hide_file"
            type="file"
            name="images"
            required
            multiple
            accept="image/png, image/gif, image/jpeg"
            hidden
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
