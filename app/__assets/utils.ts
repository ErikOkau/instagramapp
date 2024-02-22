import { createHash } from "crypto"
import fs from 'fs';

export function sha256(text:string) {
    const hash = createHash("sha256")
    hash.update(text)
    return hash.digest("hex")
}

export function imageToBase64(file: File): Promise<number[]> {
    return new Promise((resolve, reject) => {
        const arrayBuffer = file.arrayBuffer()
    });
}