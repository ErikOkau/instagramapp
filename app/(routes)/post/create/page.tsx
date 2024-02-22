"use client"

import { createPost } from "@/app/__actions/postActions"
import SubmitButton from "@/app/__components/submitButton"

export default function () {
    return (
        <form action={async formData => {
            const response = await createPost(formData)
            console.log(response)
        }}>
            <input type="file"  name="images" required multiple accept="image/png, image/gif, image/jpeg" />
            <textarea name="content" placeholder="Content" required />
            <SubmitButton 
                text="Create"
                pendingText="Creating..."
            />
        </form>
    )
}