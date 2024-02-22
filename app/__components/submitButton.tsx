import { useFormStatus } from "react-dom"

export default function SubmitButton({ text, pendingText }: { text: string, pendingText: string }) {
    const { pending } = useFormStatus()

    return (
        <button type="submit">
            {pending ? pendingText : text}
        </button>
    )
}