"use client"
import { addComment } from "@/app/__actions/postActions";
import SubmitButton from "../submitButton";
import { useRouter } from "next/navigation"
import { useRef } from "react";
import './comments.scss'

export default function async({postId}: {postId?: number}) {
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form ref={formRef} action={async formdata => {
            if(!postId) return
            
            const comment = formdata.get("comment")?.toString() 
            if(!comment) return
            
            formdata.append("postId", postId.toString())
            const response = await addComment(formdata)
            

            if (response.error) {
                return alert(response.error)
            }

            formRef.current?.reset()
            router.refresh()
        }} >
            <input type="text" name="comment" placeholder="Legg til en kommentar ..." />
            {/* <SubmitButton text="comment" pendingText="adding" /> */}
        </form>
    )
}