import type { NextRequest } from 'next/server'
import { updateSession } from './app/__actions/authActions'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  console.log('middleware')   
  return await updateSession(request)
}