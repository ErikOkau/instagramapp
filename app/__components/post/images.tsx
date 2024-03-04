"use client"

import { Image } from "@prisma/client"
import "./images.scss"
import { useRef, useState } from "react"

interface clientImage extends Omit<Image, "bytes"> {
    bytes: string
}

export default function ({images}: {images?: clientImage[]}) {
    if (images == undefined) return <div></div>

    const [currentImage, setCurrentImage] = useState(1)
    const imagesRef = useRef<HTMLDivElement>(null)

    function changeImage(direction: "back" | "forwards") {        
        if(direction === "back") {
            if(currentImage === 1) return
            setCurrentImage(currentImage - 1)
        } else if(direction === "forwards") {
            if(currentImage === images!.length) return
            setCurrentImage(currentImage + 1)
        }

        const scroll = imagesRef.current!.scrollWidth / images!.length * currentImage
        

        imagesRef.current!.scrollTo({
            left: scroll,
            behavior: "smooth"
        })
        console.log("changing image", currentImage, direction)
        console.log("scrolling to", scroll)
    }

    return (
        <div className="imageCarusel">
            <div className="arrow" onClick={() => changeImage("back")}>
                <img src="/arrow.svg" />
            </div>
            <div className="images" ref={imagesRef} >
                {images.map(image => <img src={`data:image/png;base64,${image.bytes}`} key={image.orderNumber} />)}
            </div>
            <div className="arrow arrowRight" onClick={() => changeImage("forwards")}>
                <img src="/arrow.svg" />
            </div>
        </div>
    )
}