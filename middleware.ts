import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"
import { updateSession } from "./app/__actions/authActions"

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {
  const token = req.cookies.get("session")
  const { pathname, origin } = req.nextUrl
  
  if (!token && pathname !== "/login") {
    const splitPath = pathname.split("/")


    if (allowedPaths.includes(splitPath[1]) || pathname !== "/") {
      return NextResponse.next()
    } else if (splitPath[splitPath.length - 1].split(".")[1] === "svg") {
      return NextResponse.next()
    }
    return NextResponse.redirect(`${origin}/login`)
  }

  return await updateSession(req)
}

const allowedPaths = ["__next", "unselected_icon"]
