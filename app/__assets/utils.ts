import { createHash } from "crypto"
import fs from 'fs';

export function sha256(text:string) {
    const hash = createHash("sha256")
    hash.update(text)
    return hash.digest("hex")
}

export function isServerError<T>(data: T | number): data is number {
    return typeof data === "number"
}