import { createHash } from "crypto"

export function sha256(text:string) {
    const hash = createHash("sha256")
    hash.update(text)
    return hash.digest("hex")
}

export function isServerError<T>(data: T | number): data is number {
    return typeof data === "number"
}

export function postDateFormater(date: Date) {
    const today = new Date()
    const diff = today.getTime() - date.getTime()

    if (diff < 1000 * 60) return "just now"
    if (diff < 1000 * 60 * 60) return `${Math.floor(diff / (1000 * 60))} minutes ago`
    if (diff < 1000 * 60 * 60 * 24) return `${Math.floor(diff / (1000 * 60 * 60))} hours ago`
    if (diff < 1000 * 60 * 60 * 24 * 7) return `${Math.floor(diff / (1000 * 60 * 60 * 24))} days ago`
    if (diff < 1000 * 60 * 60 * 24 * 30) return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 7))} weeks ago`
    if (diff < 1000 * 60 * 60 * 24 * 365) return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 30))} months ago`
    return `${Math.floor(diff / (1000 * 60 * 60 * 24 * 365))} years ago`
}