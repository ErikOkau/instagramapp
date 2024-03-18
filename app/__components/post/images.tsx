"use client"

import { Image } from "@prisma/client"
import "./images.scss"
import { useState } from "react"

interface clientImage extends Omit<Image, "bytes"> {
    bytes: string
}

export default function ({images}: {images?: clientImage[]}) {
    if (images == undefined) return <div></div>

    const [caruselOffset, setOffset] = useState(0)

    function changeImage(direction: "back" | "forwards") {  

        if (direction == "back") {
            if (caruselOffset == 0) return
            setOffset(caruselOffset - 580)
        } else {
            if (caruselOffset == (images!.length - 1) * 580) return
            setOffset(caruselOffset + 580)
        }
    }

    return (
        <div className="imageCarusel">
            <div className="arrow" onClick={() => changeImage("back")}>
                <img src="/arrow.svg" />
            </div>
            <div className="images" style={{
                "transform": `translateX(-${caruselOffset}px)`
            }}>
                {images.map(image => <img src={`data:image/png;base64,${image.bytes}`} key={image.orderNumber} />)}
            </div>
            <div className="arrow arrowRight" onClick={() => changeImage("forwards")}>
                <img src="/arrow.svg" />
            </div>
        </div>
    )
}