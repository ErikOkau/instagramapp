import { useFormStatus } from "react-dom"
import './login_register.scss'

export default function SubmitButton({ text, pendingText }: { text: string, pendingText: string }) {
    const { pending } = useFormStatus()

    return (
        <button type="submit">
            {pending ? pendingText : text}
        </button>
    )
}