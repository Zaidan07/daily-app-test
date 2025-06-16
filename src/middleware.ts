import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const { pathname } = req.nextUrl


      if (!token) return false


      if (pathname.startsWith("/admin")) {
        return token.role === "ADMIN"
      }

      return true
    },
  },
  pages: {
    signIn: "/login",
  }
})

export const config = {
  matcher: ["/((?!login|api|_next|favicon.ico|assets).*)"],
};
