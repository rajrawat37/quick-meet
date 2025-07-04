import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';


const protectedRoutes = createRouteMatcher([
  '/',
  '/upcoming',
  '/previous',
  '/recordings',
  '/personal-room',
  '/meeting(.*)'
]);

export default clerkMiddleware(async (auth, req) => {
  // 🔍 Debug: Log the current path being accessed
  console.log(req.nextUrl.pathname);
  // 🚀 Middleware execution log
  console.log("🔥 This is the middleware getting executed before the request is made 🔥")

  // 🔒 Protect routes that require authentication
  if (protectedRoutes(req)) {
    await auth.protect()
  }
})


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}